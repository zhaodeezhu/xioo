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
}