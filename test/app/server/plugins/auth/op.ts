import { Plugin } from 'xioo';

export default class Time extends Plugin {
  excute() {
    const app = this.app;
    app.router.setRoute({method: 'get', url: '/api/auth/op', controller: (ctx, next) => {
      ctx.state.data = {
        status: 200,
        data: '我是auth',
        message: '成功了'
      }
    }})
  }
}