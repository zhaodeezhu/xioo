import * as path from 'path';
import RouterApp from 'koa-router';
import {routerList, controlllerList, IMethod, methods} from './structure';


import App from '../App';

const router = new RouterApp();

class Router {
  /** 全局app上下文 */
  app: App;

  constructor(app: App) {
    this.app = app;
    this.readImport();
  }

  /** 注册路由，此处要修改 */
  registerRouter() {
    this.app.server.use(router.routes() as any);
    this.app.server.use(router.allowedMethods() as any);
  }

  /** 写入controller信息 */
  start() {
    routerList.forEach(item => {
      const {basepath, Constrcutor} = item;
      const RouterController = new Constrcutor(this.app);
      // 注册controller
      this.app.controller.registerController(Constrcutor.name, RouterController);
      controlllerList
      .filter(controller => Constrcutor.prototype === controller.target)
      .forEach(route => {
        let url: any;
        if(route.path instanceof RegExp) {
          url = route.path
        } else {
          url = path.join(basepath, route.path);
        }
        router[route.method as IMethod](url, async (ctx, next) => {
          function ControllerPrototype() { this.ctx = null; this.next = null}
          ControllerPrototype.prototype = RouterController;
          const Controller = new ControllerPrototype();
          Controller.ctx = ctx;
          Controller.next = next;
          const res = await RouterController[route.controllerName].call(Controller)
          if(!res) {
            // await next();
          } else {
            ctx.state.data = res;
          }
        });
      });
    });
    this.readLess();
  }

  /** 读取动态的路径 */
  readImport() {
    // 读取和页面相关的controllers
    this.app.helper.dirTreeSource(path.join(this.app.readRoot, './pages'), [], [], ['controllers'], false);
    this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/controllers'));
    // Object.keys(res).forEach(key => {
    //   if(key.indexOf('less') > -1) return;
    //   const Con = res[key];

    //   new Con(this.app);
    // })
  }

  /** 
   * 动态读取controller less信息 
   * 重点是如何获取到底是什么请求
   * 既然不知道就全部注册一遍吧
   * 后续想想如何准备的注释
   * */
  readLess() {
    const res = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/controllers'), ['less']);
    methods.forEach(method => {
      Object.keys(res).forEach(url => {
        const result = '/less/' + url;
        router[method as IMethod](result, (ctx, next) => {
          res[url](this.app, ctx, next);
        });
      });
    });
  }
}

export = Router;