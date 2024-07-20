# d-tgz
<!-- TOC -->
* [d-tgz](#d-tgz)
  * [说明](#说明)
  * [基本用法](#基本用法)
  * [命令](#命令)
<!-- TOC -->


## 说明
通过解析package-lock.json，将依赖包的tgz文件及其package.json下载到对应的目录中。
## 基本用法
```
npm install d-tgz -g

d-tgz d 
```

## 命令

| 命令                              | 作用                             |
|---------------------------------|--------------------------------|
| d-tgz <download, d, install, i> | 读取目录下的 package-lock.json 下载依赖项 |
| d-tgz <-h, --help >             | 帮助                             |
| d-tgz <-V, --version>           | 版本信息                           |
