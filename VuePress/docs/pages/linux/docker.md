---
title: Docker笔记
description: 
editLink: false
---

## docker-compose命令安装
### 手动安装（推荐）
#### 下载

下载地址：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

文件名：aarch64
#### 上传到服务器上

移动文件到/usr/local/bin目录下
```Bash
mv /上传地址/docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
```
赋予执行权限
```Bash
chmod x docker-compose
chmod 755 docker-compose
```
查看docker-compose版本
```Bash
docker-compose -version
```
    
### 一键安装（使用github直接拉取）

一般因为github直接拉取的时间较长，所以推荐手动下载。
```Bash
# 1、登入 GitHub ，找到对应版本
curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
# 2、将下载后的文件放到 /usr/local/bin 目录下，并添加执行权限
chmod +x /usr/local/bin/docker-compose
```