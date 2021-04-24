import { MiddleClass, Middle, Middleware } from 'xioo';

@MiddleClass()
export default class PageRedirect extends Middleware {
  @Middle()
  async changePage() {
    const { ctx, next } = this;
    console.log(ctx.url);
    
    if(ctx.url === '/') {
      ctx.redirect('/page/user')
    }
    await next();
  }

  @Middle('end')
  async changeEnd() {
    const { ctx, next } = this;

    ctx.state['a'] = '1111';
    console.log('我是中间件后值得');
    await next();
  }
}