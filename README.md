# d-tgz
<!-- TOC -->
* [d-tgz](#d-tgz)
  * [说明](#说明)
  * [使用](#使用)
    * [1、通过npm全局安装d-tgz。](#1通过npm全局安装d-tgz)
    * [2、使用命令下载依赖包。](#2使用命令下载依赖包)
  * [命令](#命令)
    * [1、根据目录下的package-lock.json下载依赖包](#1根据目录下的package-lockjson下载依赖包)
    * [2、根据目录下的package.json下载依赖包](#2根据目录下的packagejson下载依赖包)
    * [3、指定要下载的依赖包](#3指定要下载的依赖包)
<!-- TOC -->


## 说明
下载依赖包的tgz文件及其package.json到对应的目录中。
## 使用
### 1、通过npm全局安装d-tgz。
```
npm install d-tgz -g
```
### 2、使用命令下载依赖包。
```                               
d-tgz d 
```

## 命令

### 1、根据目录下的package-lock.json下载依赖包
````
d-tgz <download | d | install | i>
````
### 2、根据目录下的package.json下载依赖包
````
d-tgz <download | d | install | i> <-p | --package>
````

### 3、指定要下载的依赖包
````
d-tgz <download | d | install | i> <vue | vue@0.0.0>
````