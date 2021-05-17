import { Post, Route, Controller, Get } from 'xioo'; 
import * as path from 'path';
import { Time } from 'xioo';

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

    // await next();
    
    let data = await this.app.xios.base.get('/promise/auth/test');
    const query = ctx.querystring;
    const query2 = ctx.query;
    console.log(data);
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

  @Time((time, that) => { console.log(time);console.log(that.app) })
  @Get('/pg')
  async testPg() {
    const { app: { pg } } = this;
    // console.log(app);

    // let res = await pg.query<any[]>('select * from mpuser');
    // const res = 'aaaa';
    let i = 0;
    for (let index = 0; index < 10000; index++) {
      i++;
    }

    return i;
  }
}

// export = Auth;