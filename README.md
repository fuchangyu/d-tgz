- [中文](#cn)  [English](#en) 


# <span id="zh"> 中文说明 </span>
下载依赖包的tgz文件及其package.json到对应的目录中。

<!-- TOC -->
* [<span id="zh"> d-tgz </span>](#span-idzh-中文说明-span)
  * [使用](#使用)
    * [1、通过npm全局安装d-tgz。](#1通过npm全局安装d-tgz)
    * [2、使用命令下载依赖包。](#2使用命令下载依赖包)
  * [命令](#命令)
    * [1、根据目录下的package-lock.json下载依赖包](#1根据目录下的package-lockjson下载依赖包)
    * [2、根据目录下的package.json下载依赖包](#2根据目录下的packagejson下载依赖包)
    * [3、指定要下载的依赖包（以vue为例）](#3指定要下载的依赖包以vue为例)
<!-- TOC -->


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

### 3、指定要下载的依赖包（以vue为例）
````
d-tgz <download | d | install | i> <vue | vue@0.0.0>
````


# <span id="en"> English Instructions </span>
Downloading tgz Files of Dependencies and Their package.json into Corresponding Directories.


<!-- TOC -->
* [<span id="en"> d-tgz </span>](#span-iden-english-instructions-span)
  * [Usage](#usage)
    * [1、Install d-tgz Globally via npm.](#1install-d-tgz-globally-via-npm)
    * [2、Use Commands to Download Dependencies.](#2use-commands-to-download-dependencies)
  * [Commands](#commands)
    * [1、Download Dependencies Based on the package-lock.json in the Directory](#1download-dependencies-based-on-the-package-lockjson-in-the-directory)
    * [2、Download Dependencies Based on the package.json in the Directory](#2download-dependencies-based-on-the-packagejson-in-the-directory)
    * [3、Specify a Dependency to Download (e.g. vue)](#3specify-a-dependency-to-download-eg-vue)
<!-- TOC -->


## Usage
### 1、Install d-tgz Globally via npm.
```
npm install d-tgz -g
```
### 2、Use Commands to Download Dependencies.
```                               
d-tgz d 
```

## Commands

### 1、Download Dependencies Based on the package-lock.json in the Directory
````
d-tgz <download | d | install | i>
````
### 2、Download Dependencies Based on the package.json in the Directory
````
d-tgz <download | d | install | i> <-p | --package>
````

### 3、Specify a Dependency to Download (e.g. vue)
````
d-tgz <download | d | install | i> <vue | vue@0.0.0>
````