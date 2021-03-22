import { MiddleClass, Middle, Middleware } from 'xioo';

@MiddleClass()
export default class PageRedirect extends Middleware {
  @Middle()
  async changePage() {
    const { ctx } = this;
    console.log(ctx.url);
    
    if(ctx.url === '/') {
      ctx.redirect('/page/user')
    }
  }

  @Middle('end')
  async changeEnd() {
    const { ctx } = this;

    ctx.state['a'] = '1111';
    console.log('我是中间件后值得');
  }
}