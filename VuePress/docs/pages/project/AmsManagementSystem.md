---
title: 附件管理中心
description: 
editLink: false
---

# 附件管理中心

## 项目设计
1. 使用场景
    适用于多服务下的附件共享。

## 功能点
1. minio容灾部署（docker）

2. 使用minio进行文件的存储
    - minio java sdk的使用

3. Java原生文件存储

4. plugin插件实现文件系统本地存储以及ams远端存储交互

5. 前端实现pdf、excel、word文件的预览显示


## 后端实现

### 1、mino多机容灾部署
技术选型的时候，查看了多个附件存储的服务，例如：FastDfs、MinIO等。从文档、部署难度、sdk、效率进行判断，最后选择了MinIO。

使用docker-compose进行部署，内置nginx进行负载均衡。

::: details docker-compose.yml详细
```yml
version: '3.7'

# 所有容器通用的设置和配置
x-minio-common: &minio-common
  image: minio/minio
  command: server --console-address ":9001" http://minio{1...4}/data
  expose:
    - "9000"
  # environment:
    # MINIO_ROOT_USER: minioadmin
    # MINIO_ROOT_PASSWORD: minioadmin
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
    interval: 30s
    timeout: 20s
    retries: 3

# 启动4个docker容器运行minio服务器实例
# 使用nginx反向代理9000端口，负载均衡, 你可以通过9001、9002、9003、9004端口访问它们的web console
services:
  minio1:
    <<: *minio-common
    hostname: minio1
    ports:
      - "9001:9001"
    volumes:
      - ./data/data1:/data

  minio2:
    <<: *minio-common
    hostname: minio2
    ports:
      - "9002:9001"
    volumes:
      - ./data/data2:/data

  minio3:
    <<: *minio-common
    hostname: minio3
    ports:
      - "9003:9001"
    volumes:
      - ./data/data3:/data

  minio4:
    <<: *minio-common
    hostname: minio4
    ports:
      - "9004:9001"
    volumes:
      - ./data/data4:/data

  nginx:
    image: nginx:latest
    hostname: nginx
    volumes:
      - ./config/nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "9000:9000"
    depends_on:
      - minio1
      - minio2
      - minio3
      - minio4
```
:::

在data的文件夹下会有四个data路径，数据会被多次复制到不同的节点上，确保即使某个节点发生故障，数据也不会丢失。

### 2、使用场景
1. 已部署MinIO，使用AMS远端作为附件中心，并且对MinIO作为附件管理器；
2. 未部署MinIO，使用AMS本地作为附件中心；
3. 未部署MinIO，使用AMS插件做服务自身的附件中心进行使用。

使用场景的区分上，后端使用application的形式进行配置，例如：
```yml
ams:
  # remote 远端，local 本地
  mode: remote
  minio:
    endpoint: http://10.191.5.124:9000
    accessKey: minioadmin
    secretKey: minioadmin
```
::: warning 切记
需要项目启动时配置保持一致，中途修改恐导致数据不整
:::

使用策略模式的设计模式，在项目启动时对当前选择的存储策略进行判断，然后进行AMS的实现。

#### 定义接口类
```java
public interface AttachmentService {
	
	/**
     * 上传文件
     * @param path 桶名/系统编码+系统区分 + dbid
     * @param file 		  文件
     * @return
     */
	AmsResult upload(String path,MultipartFile[] file);

    /**
     * 获取文件流
     * @param path 桶名 + 系统区分 + dbid
     */
	void download(HttpServletResponse response,String path);

    ...
}

```
#### 本地模式
```java
// 本地模式
@ConditionalOnProperty(prefix="ams",name = "mode", havingValue = "local")
public class AttachmentServiceImpl implements AttachmentService{
    ...
}

```
#### 远端模式
```java
// 远端模式
@ConditionalOnProperty(prefix="ams",name = "mode", havingValue = "minio")
public class MinioServiceImpl implements AttachmentService {
    ...
}
```

### 3、文件上传、下载功能实现
#### 使用MinIO的sdk功能
```java
// 上传文件
minioClient.putObject(PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(systemTypeCode+"/"+systemRelationId+"/"+fileName)
                        .stream(in, in.available(), -1)
                        .contentType(file.getContentType())
                        .build());
// 下载文件
minioClient.getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(systemTypeCode+"/"+systemRelationId+"/"+fileName)
                        .build());

// 删除文件
minioClient.removeObjects(RemoveObjectsArgs.builder()
                        .bucket(dataList.get(0).getSystemCode())
                        .objects(dos)
                        .build());

// 获取文件信息
minioClient.statObject(StatObjectArgs.builder()
                        .bucket(bucketName)
                        .object(fileName)
                        .build());

// 桶操作等等
...
```
#### 使用Java自身实现
```java
// 上传文件
in = file.getInputStream();
out = new FileOutputStream(FilePathUtil.getRealFilePath(uploadAddress+"/"+attachMentName));
int bytesRead = 0;
byte[] buffer = new byte[1024];
while ((bytesRead = in.read(buffer, 0, 1024)) != -1) {
    out.write(buffer, 0, bytesRead);
}

// 下载文件
File file = new File(downloadAddress);
FileInputStream iStream = new FileInputStream(file);
byte[] data = readInputStream(iStream);

HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
if(request.getHeader("User-Agent").toUpperCase().indexOf("MSIE")>0){
    response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(fileName, "UTF-8")+"\"");
}else{
    response.setHeader("Content-Disposition", "attachment;filename=\"" + new String((fileName).getBytes("UTF-8"),"ISO8859-1")+"\"");
}
response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
out = response.getOutputStream();
out.write(data);
out.close();

// 删除文件
String realPath = FilePathUtil.getRealFilePath(rootAddress+info.getUploadPath());
File file = new File(realPath);
JSONObject object = new JSONObject();
object.put("file", realPath);
object.put("info", info);
object.put("status", file.delete());
results.add(object);

...
```

### 4、AMS Plugin的写法
#### 本地存储
本地存储部分代码与AMS 远端ap local本地模式的代码逻辑类似，在此就不过多赘述，详见[链接](#使用java自身实现)。

#### 远端存储
因为AMS服务暂不使用oauth2，所以可以直接使用`restTemplate`的方式与远端AMS服务进行连接。
```java
// 上传文件
ResponseEntity<Result> responseEntity = restTemplate.postForEntity(config.getRemoteUrl() + "/api/upload", map, Result.class);

// 下载文件
ResponseEntity<Resource> responseEntity = restTemplate.exchange(config.getRemoteUrl() + "/api/download?path="+path,HttpMethod.GET, null, Resource.class);
			
in = responseEntity.getBody().getInputStream();

// 删除文件
ResponseEntity<Result> responseEntity = restTemplate.postForEntity(config.getRemoteUrl() + "/api/delete", map, Result.class);

// 获取列表
ResponseEntity<Result> responseEntity = restTemplate.getForEntity(config.getRemoteUrl() + "/api/bucket/list?path={path}", Result.class, map);

...
```
#### 后台工具类
可以将业务逻辑与文件的相关逻辑进行混合使用，对接口实现方法进行简单的包装。
```java
// 上传文件
Result result = amsPlusFileService.upload(path, file);

// 删除文件
Result result = amsPlusFileService.delete(files);

// 文件list
Result result = amsPlusFileService.list(bucketName);

// 批量删除
Result result = amsPlusFileService.removeFiles(fileId, toPath);
```

### 5、office文件的前端预览
引入[vue-office](https://501351981.github.io/vue-office/examples/docs/guide/)项目进行使用，可以进行pdf、word、excel等文件的预览，十分方便。

实现方式为：
#### 前端
因为其为vue组件开发的方式，无法直接使用script直接导入使用，因此使用了vue-cli脚手架搭建了一个简易的项目，引入改vue-office插件；

**入口文件 App.vue**
```vue
// 首页
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

**路由 router.js**
```js
const router = new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/word',
      name: 'word',
      component: () => import('../views/WordViewer.vue'),
      props: route => ({ file: route.query.file })
    },{
      path: '/excel',
      name: 'excel',
      component: () => import('../views/ExcelViewer.vue'),
      props: route => ({ file: route.query.file })
    },{
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/PDFViewer.vue'),
      props: route => ({ file: route.query.file })
    }
  ]
})
```

**样例 PDFViewer.vue**
```vue
<template>
  <div>
    <vue-office-pdf 
        :src="pdf"
        style="height:100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
        :options="options"
    />
  </div>
</template>
<script>
//引入VueOfficeDocx组件
import VueOfficePdf from '@vue-office/pdf'

export default {
    components: {
        VueOfficePdf
    },
    data(){
      return {
        pdf: '../test.pdf',
        options: {
          width: 500, 
        }
      }
    },
    created(){
      this.pdf = this.$route.query.file;
    }
}
</script>
```

#### 后端
```java
@Controller
@RequestMapping("/ams")
public class AmsPlusWebController { 
    ...
	@GetMapping("/viewer")
	public String viewer() {
		return "AmsViewer";
	}
}

```

## 前端实现