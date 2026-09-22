---
title: upload-labs做题记录
date: 2026-09-22 20:05:21
tags:
---

**upload-labs靶场通关**



![image-20260922211145563](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/b13201f7103abe15dee23bb23f23a462-image-20260922211145563.png)

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

![屏幕截图 2026-09-22 212832](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/34f2acb6bd77e856ea93eceaea50e1ec-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212832.png)



**Pass01**

上传一个3.php发现弹出弹窗, 典型的 JS 前端验证

![屏幕截图 2026-09-22 193349](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/22bf63a43f433334e5e5dd64c12755bf-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20193349.png)

**方式一：禁用javascript**

### Firefox

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

能上传.jpg图片；改了很久的文件后缀，结果都不行，查看提示发现想错了

![屏幕截图 2026-09-22 212316](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/374cdc6133cd8a918e51007851534036-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212316.png)



把Content-Type: application/octet-stream改成image/jpeg就好了



![屏幕截图 2026-09-22 212240](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/6b557f59146da0659f1c209e36ee4426-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212240.png)

。。。。。。。。。。。。。。。。。。。。。。。。

![屏幕截图 2026-09-22 212203](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/d46a2eda902d47e8622b70b873d8bcdf-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212203.png)

。。。。。。。。。。。。。。。。。。。。。。。。。

![](https://cdn.jsdelivr.net/gh/CheerrightNow/my-blog-images@img/img/img/2026/09/22/97c93a3b7062f715d24c4a15c4a5f2b5-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-09-22%20212302.png)
