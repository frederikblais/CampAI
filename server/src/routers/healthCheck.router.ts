const Router = require('@koa/router');
export const healthCheckRouter = new Router({
    prefix: '/'
});

// Console format
const line = '---------------------------------------'

healthCheckRouter.get('/', (ctx) => {
    ctx.response.status = 200;
    console.log('response: ',ctx.response.status)
    ctx.body = 'API Status: Online'
    console.log(line)
})