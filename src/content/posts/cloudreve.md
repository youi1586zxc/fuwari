---
title: 使用Termux搭建cloudreve
published: 2025-08-07
description: ' 使用Termux搭建cloudreve'
image: 'https://www.dmoe.cc/random.php'
tags: [cloudreve,Termux,个人网盘]
category: 'Termux'
draft: false 
lang: ''
---

在数字化时代，拥有个人云盘能便捷地存储和管理文件。今天，就为大家详细介绍如何在安卓设备的Termux环境里搭建Cloudreve。
 
前期准备
 
确保你的安卓设备已安装Termux应用，可从官方渠道或应用商店获取。安装完成后，打开Termux，准备后续操作。
 
更新Termux软件包
 
为保证安装的软件是最新版本，修复潜在问题，在Termux终端输入并执行以下代码：

```javascript
apt update && apt upgrade

```
这会更新软件包列表，并升级已安装的软件包。

安装依赖
Cloudreve运行依赖特定软件环境，我们需安装必要工具，如`unzip`用于解压文件，`wget`用于下载文件 ，在终端输入命令安装：

```javascript
apt install wget&&apt install unzip
```

创建一个文件夹

```javascript
mkdir cloud
```

进入文件夹目录

```javascript
cd cloud
```
下载Cloudreve安装包

使用`wget`下载Cloudreve安装包，在Termux终端输入命令（注意：需根据Cloudreve官方最新发布版本链接调整）：

```javascript
wget https://github.com/cloudreve/Cloudreve/releases/download/3.8.3/cloudreve_3.8.3_linux_arm64.tar.gz
```

上述命令以`v3.8.3`版本的Linux arm64架构安装包为例，实际操作请前往Cloudreve官方仓库查看最新稳定版本链接并替换。

解压安装包
下载完成后，解压压缩包，输入以下命令：

```javascript
tar -zxvf cloudreve_3.8.3_linux_arm64.tar.gz
```

赋予cloudreve权限

```javascript
chmod +x./cloudreve
```

启动Cloudreve
一切就绪后，在Termux终端输入命令启动Cloudreve：

```javascript
./cloudreve
```

启动成功后，在浏览器访问了`http://127.0.0.1:5212`（默认端口，若在配置文件修改端口，使用修改后的端口访问），按页面提示完成初始化设置，就能使用私人云盘了！

接下来安装cpolar内网穿透
cpolar它支持http/https/tcp协议，可以永久免费使用不限制流量，无需公网IP，也不用设置路由器。用过一段时间后你会发现，它甚至还可以直接在家中实现小型的云服务。

创建一个sources.list.d的文件夹:

```javascript
mkdir -p $PREFIX/etc/apt/sources.list.d
```

添加cpolar下载源文件

```javascript
echo "deb [trusted=yes] http://termux.cpolar.com termux extras" >> $PREFIX/etc/apt/sources.list.d/cpolar.list
```

更新仓库

```javascript
pkg update
```

安装cpolar

```javascript
pkg install cpolar
```

安装Termux服务，注意: 安装完成后记得关闭重启一下Termux才生效!!

```javascript
pkg install termux-services
```

设置开机自启

```javascript
sv up cpolar
```

cpolar.yml主配置文件路径位置

```javascript
$PREFIX/etc/cpolar/cpolar.yml
```

然后在手机浏览器我们输入`http://localhost:9200`即可看到cpolar管理界面，使用在cpolar官网注册的账号即可登陆
