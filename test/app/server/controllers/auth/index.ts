import { Post, Route, Controller } from 'xioo'; 
import * as path from 'path';

new RegExp(/[a-z]+\.less/)

@Route('/promise/auth')
export default class Auth extends Controller {
  @Post('/login')
  async login() {
    const { app, ctx } = this;
    let res = app.helper.dirTreePath(path.join(app.projectRoot, './app/pages'), [], [new RegExp(/[a-z]+\.less/)]);

    // this.app.service.User.login()
    // this.app.service.User.login();
    // this.app.service
    // console.red('我执行了')
    return {
      data: res,
      status: '0'
    }
    // ctx.body = {
    //   data: res,
    //   status: '0'
    // }
  }
}

// export = Auth;