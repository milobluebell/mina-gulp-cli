# Mina-Gulp-Cli



## 一、针对哪些需求？

* **快速搭建功能强大还轻量**的微信小程序开发环境
  
* 不推崇任何其它框架风格在小程序中的随意套用、**最小程度的代码入侵**，让微信小程序的本身被你安排得明明白白
  
* 基于**ES6+** / **Sass**环境进行开发
  
* **使用Promise**替代小程序原生wx.request的回调地狱

* 搭载**状态管理工具**aya-store，避免疯狂地组件间直接传值（master分支上并不支持。如需要，请克隆withStore分支）
  
* 更多**方便而贴合小程序开发的gulp任务指令**，如gulp create --page test ，表示"创建名为test页面"
  
* 还有更多优化内容，将在后续版本加入...



## 二、使用方法：（三步走）

### 1⃣️ Step 1：克隆本项目👇
```
git clone https://github.com/milobluebell/mina-gulp-cli.git [demo_project]
```

### 2⃣️ Step 2： 使用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，导入项目(指向项目根目录的./dist文件夹)： 
![Image text](https://raw.githubusercontent.com/milobluebell/imgs-repo/master/img/intro-pic.png)

一般情况下，会自动填充一个appId。但是这个是测试使用appId的，你自己项目的appId还是需要在【微信开发者工具 - 详情】去修改

### 3⃣️ Step 3： 初始化项目
输入👇
```
gulp dist
```
可以见./dist文件夹中出现编译结果。最后输入👇
```
gulp watch
```
即可开始在./src目录下，愉悦地开发了。
（如果需要修改$http发送的请求的baseUrl，需要在./src/mina/utils/HttpClient/host.js中进行修改）



## 三、More 更多：

### 1. 修改git远程refs

### 2. 长得帅的都扩展了阅读👇：
请见：Tell Me More

### 3. 计划中陆续加入的功能：
* 引入状态管理器，更方便地在页面和组件间传值。[✅DONE]：使用方式参见[**aya-store**](https://github.com/milobluebell/aya-store)文档
* 加入Eslint，更一致化的代码规范管理。
* 使用npm全局命令，更方便地执行脚手架命令，托管更多你想配备的小程序。



## 四、协议 Licenses

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/milobluebell/mina-gulp-cli/blob/master/LICENSE)


[![LICENSE](https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

