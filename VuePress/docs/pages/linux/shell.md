---
title: Shell笔记
description: 
editLink: false
---
:::tip
用于记录常用的sh命令。
:::
## 一、查看系统配置

### 1、查看系统各分区使用情况

```sh
df -h
lsblk
df -Th
```

### 2、查看系统内核版本（系统）

```sh
cat /etc/os-release
```

### 3、查看cpu

```sh
lscpu
```

### 4、查看内存大小

```sh
free -h
```

### 5、压缩文件
脚本sh，需要给脚本加上权限。
```sh
#!/bin/sh 
date=`date +"%Y%m%d"` 
tar -czvf /opt/ftp/soft_$date.tar.gz /usr/soft
```
使用crontab进行定期执行

### 6、解压文件

```sh
gzip -d filename
```

### 7、查看文件夹的大小

```sh
du -sh 文件夹名
```

### 8、查看开机自启项目

```sh
systemctl list-unit-files | grep xxx
```

### 9、查看进程

```sh
ps aux | grep jenkins
```

### 10、杀死进程

```sh
kill -9 xxx
```

## 二、小项目
### 1、定期删除log
```sh
#!/bin/bash -x
# 系统日志匹配名称
access_log="access*..log"
server_log="server.log.*"
gc_log="gc_*.log.0.current"
# 间隔时间
gap_time="100"
# 系统日志地址
qms_log_path="/usr/local/services/xxxx/log"
#filepath is exist
if [ -d "$qms_log_path" ];
then
  echo start delete log $gap_time days ago...;
  find $qms_log_path/* -name "$access_log" -mtime +$gap_time -type f -delete;
  find $qms_log_path/* -name "$server_log" -mtime +$gap_time -type f -delete;
  find $qms_log_path/* -name "$gc_log" -mtime +$gap_time -type f -delete;
  # add this
  echo end delete log...
else
  echo can not find the file, please check
fi
```