import App from '../App';

/** 基础Middleware，主要用于继承 */
class Middleware {

  /** 全局app上下文 */
  app: App;

  /** 请求上下文 */
  ctx: any;

  constructor(app: App) {
    this.app = app;
  }
}

export = Middleware;