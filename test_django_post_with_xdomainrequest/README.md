测试 django 和 XDomainRequest 的问题
---

## 运行
### 运行 node 进程
```
node node.js
```
即开启了 http://ip:3001 的服务

### 运行 django 进程
```
cd test_post
python manage.py runserver 0.0.0.0:3002
```
即开启了 http://ip:3002 的服务

### 开启页面请求服务
`anywhere 3003`
即开启了 http://ip:3003 的服务，可看到服务结果。

## 相关依赖
1、 nodejs  
2、 npm  
3、 anywhere  
4、 django==1.8.3  

## 相关文章：

[Django 框架关于 IE 跨域 XDomainRequest 传输的问题](http://blog.shenqh.com/2015/08/14/test_django_post_request_method/)
