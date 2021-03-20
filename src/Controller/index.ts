import App from '../App';

/** 基础Controller，主要用于继承 */
class Controller {

  /** 全局app上下文 */
  app: App;

  /** 请求的上下文 */
  ctx: any;

  constructor(app: App) {
    this.app = app;
  }
}

export = Controller;