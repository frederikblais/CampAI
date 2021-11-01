export function logger() {
    return async function (ctx, next) {
      const logStr = `${ctx.method} "${ctx.url}"`;
  
      console.log(logStr);
  
      await next();
    };
  }