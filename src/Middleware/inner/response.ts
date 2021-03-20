import debugs from 'debug';

const debug = debugs('aps-cloud');

export default () => {
  return async (ctx, next) => {
    try {
      // 调用下一个 middleware
      await next()
      // 处理响应结果
      // 如果直接写入在 body 中，则不作处理
      // 如果写在 ctx.body 为空，则使用 state 作为响应
      ctx.body = ctx.body ? ctx.body : (ctx.state.data !== undefined ? ctx.state.data : {status: 404})
    } catch (e) {
      // catch 住全局的错误信息
      debug('Catch Error: %o', e)
      console.log("Error====>>"+ e)
      // 设置状态码为 200 - 服务端错误
      ctx.status = 500
  
      // 输出详细的错误信息
      ctx.body = {
        code: -1,
        message: e && e.message ? e.message : e.toString()
      }
    }
  }
}
