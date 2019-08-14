# Mina-Gulp-Cli [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/milobluebell/mina-gulp-cli/blob/master/LICENSE)
[![HitCount](http://hits.dwyl.io/milobluebell/mina-gulp-cli.svg)](http://hits.dwyl.io/milobluebell/mina-gulp-cli)

## 一、针对哪些需求？

* **快速搭建功能强大还轻量**的微信小程序开发环境
  
* 不推崇其它框架风格在小程序中的编译套用[(为什么我不推荐使用ta某ro，mp某vue之类的小程序开发框架？)](https://github.com/milobluebell/mina-gulp-cli#4-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%B8%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8ta%E6%9F%90romp%E6%9F%90vue%E4%B9%8B%E7%B1%BB%E7%9A%84%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6)、**最小程度的代码入侵**，让微信小程序的本身被你安排得明明白白
  
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
进入项目根目录，修改git远程：
```
// 删除remote
git remote rm origin

// 添加新的remote
git remote add origin [你项目的git repo地址]
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

### 1. 项目文档结构：
```

// 编译结果。小程序开发者工具指向的位置
---- dist                            
    -- /mina
    -- app.js
    -- app.json
    -- app.wxss
    -- project.config.json

// 用于指令gulp create生成页面/组件的模板。
---- seeds
    -- /css
    -- /js
    -- /json
    -- /wxml

// 项目开发目录，dist文件即是它的编译结果
---- src
    --- /mina
    --- app.js
    --- app.json
    --- app.scss
    
```


### 2. 开箱即用之余，需要你做配置的地方，基本都标记了TODO，打开TODO清单一路了然

### 3. 计划中陆续加入的功能：
* 引入状态管理器，更方便地在页面和组件间传值。[✅DONE]：使用方式参见[**aya-store**](https://github.com/milobluebell/aya-store)文档
* 使用npm全局命令，更方便地执行脚手架命令，托管更多你想配备的小程序。


### 4. 为什么我不推荐使用ta某ro，mp某vue之类的小程序开发框架？
* 微信小程序本身还欠完善，缺陷比较多。环境不够稳定，对微信的基础业务高度敏感。比如经典的"取消分享到微信的回调"等问题。使得它的迭代速度非常快，而在这种情况下，一旦使用框架，意味着等待小程序底层一个更改，你至少需要等小程序修复完，再等框架修复完，然后才轮到你开始修复。加入的更新，也是一样的。这将对业务造成极大隐患。
* 微信小程序并不是传统前端工程的单线程javascript，而是webview加jsEngine的双线程应用。跳离小程序原生的生命周期而进行的大规模开发，很容易出现因为线程问题导致的各种bug，而且排查起来非常困难。
* 微信小程序本身封装程度已经比较高。像俄罗斯套娃一样一层套一层，很显然是没有必要的。除非你需要"一处编写，到处运行"



## 四、协议 Licenses

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/milobluebell/mina-gulp-cli/blob/master/LICENSE)


[![LICENSE](https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

