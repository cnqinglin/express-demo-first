const express = require('express')
const app = express()
const logger = require('./logger')
const routerPath = require('./routerTest')

// const fn = logger('--dev')
// app.use(fn)
app.use(logger('--dev'))

// app.use(routerPath())

app.use((request,response,next) => {
    // response.write('1')
    console.log('1');
    next()
})

app.use((request,response,next) => {
    // response.write('2')
    console.log('2');
    if (true) {
        next('not login') // 如果next中有参数，那么中间件直接走到错误处理函数（不会执行后面的中间件函数）
    } else {
        next()
    }
})

app.use((request,response,next) => {
    // response.write('3')
    console.log('3');
    next()
})

// 自定义errorHandler
app.use((error, request, response, next) => {
    // 自定义错误处理程序
    // response.write(error);
    // response.send()
    // response.end();
    // next()

    console.log(error);
    next(error)
    
    
    // 默认错误处理程序
    // if (response.headersSent) {
    //     return next(error)
    //   }
    //   response.status(500)
    //   response.send(error)
})

let count = 0;
app.use((error, request, response, next) => {
    count += 1;
    console.log(`目前有${count}个错误`);
    next(error)
})

// 这种写法可以简化成下面的代码：
// app.use((request,response,next) => {
//     if (request.path === '/home') {
//         response.send('这是home')
//     }
//     next()
// })
// app.get('/home',(request,response,next) => {
//     response.send('这里是home');
//     next()
// })
// app.get('/bbbb',(request,response,next) => {
//     response.send('这里是bbbb');
// })

// 比起上面的代码，还有一个更好用的，所有的情况都可以写到route方法中，
// app.route('/aaaa')
//     .all((request,response,next) => {
//         response.send('支持所有的方法')
//         next()
//     })
//     .get((request, response, next) => {
//         response.send('这里是 /xxx路径的get方法')
//     })
//     .post()

app.listen(3000, () => {
    console.log('正在监听3000端口')
})