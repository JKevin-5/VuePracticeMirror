---
title: Jmeter笔记
description: 记录Jmeter的使用步骤
sidebar: auto
editLink: false
---
> Jmeter是Apache公司的一个开源项目，可做性能测试或接口测试。
## 一、Jmeter安装
1. 下载最新Jmeter
[Jmeter下载地址](https://jmeter.apache.org/download_jmeter.cgi)

2. 解压至非中文目录

## 二、设置环境变量
1. 设置用户变量JMETER_HOME
    ```
    D:\apache-jmeter-5.2.1
    ```
2. 新增系统变量CLASSPATH（分号自行判断）
    ```
    %JMETER_HOME%\lib\ext\ApacheJMeter_core.jar;%JMETER_HOME%\lib\jorphan.jar;
    ```
3. 修改系统变量PATH（分号自行判断）
    ```
    %JMETER_HOME%\bin;
    ```
## 三、设置中文环境
1. **临时设置**<br>
    在软件中option下点击change language即可
2. **永久设置**<br>
    在解压路径/bin/目录下，修改jmeter.properties,37行下添加`language=zh_CN`

## 四、使用Jmeter
1. 双击解压路径/bin/jmeter.bat
2. 右击环境添加线程组
3. 右击线程组添加http请求
4. 选中线程组可设置请求频率

## 五、断言判断
- http请求右键可以设置JSON断言、查看结果树<br>
    - JSON断言需要设置**Assert JSON Path exist**例如 `$..xxx`，并且选中**Additionally assert value**，在expected value中填入期望的结果内容。<br>
    - 如果不需要具体结果的话，可以判断非空，选中**expect null**是判空，接着选中**Invert assertion**是判断非空。





## 参考网站
- [知乎笔记](https://zhuanlan.zhihu.com/p/142897766)