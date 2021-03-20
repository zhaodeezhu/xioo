import App from '../App';

/** 基础Middleware，主要用于继承 */
class Plugin {

  /** 全局app上下文 */
  app: App;

  constructor(app: App) {
    this.app = app;
  }
}

export = Plugin;