import { Post, Route, Controller, Get } from 'xioo'; 
import * as path from 'path';

new RegExp(/[a-z]+\.less/)

@Route('/promise/auth')
export default class Auth extends Controller {
  @Post('/login')
  async login() {
    const { app, ctx, next } = this;
    let res = app.helper.dirTreePath(path.join(app.projectRoot, './app/pages'), [], [new RegExp(/[a-z]+\.less/)]);
    // this.app.service.User.login()
    // this.app.service.User.login();
    // this.app.service
    // console.red('我执行了')

    // console.log('我是之前的');
    // console.log(ctx.state['a'])

    await next();

    // console.log('我是之后的');

    // console.log(ctx.state['a'])
    return {
      data: res,
      status: '0'
    }
    // ctx.body = {
    //   data: res,
    //   status: '0'
    // }
  }

  @Get('/test')
  async test() {
    const { app, next } = this;
    this.app.agant.dispatchSchedule('getData', true);
    // let res = app.helper.dirTreePath(path.join(app.projectRoot, './app/pages'), [], [new RegExp(/[a-z]+\.less/)]);
    return {
      data: 'ok'
    }
  }
}

// export = Auth;