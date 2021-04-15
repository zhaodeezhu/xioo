import * as path from 'path';
import App from '../App';
import Middleware from './index';

import { middlewareClassList, middlewareFrontList, middlewareEndList, middlewareMiddleList } from './structure';

import innerMiddleware from './inner';

class MiddlewareContructor extends Middleware {

  innerMiddleware: any = innerMiddleware;

  constructor(app: App) {
    super(app);
    this.app.helper.dirTreeSource(path.join(this.app.readRoot, './server/middleware'));
    // this.registerLessMiddleware();
  }

  /** 注册自定义中间件 */
  registerMiddleware(position: 'front' | 'end' | 'middle') {
    const middlewareList: any[] = position === 'front' ? middlewareFrontList : (position === 'middle' ? middlewareMiddleList : middlewareEndList)
    middlewareClassList.forEach(item => {
      const { Constrcutor } = item;
      const MiddlewareConstrcutor = new Constrcutor(this.app);
      middlewareList
        .filter(middle => Constrcutor.prototype === middle.target)
        .forEach(ware => {
          this.app.server.use(async (ctx, next) => {
            function MiddlewarePrototype() { this.ctx = null; this.next = null }
            MiddlewarePrototype.prototype = MiddlewareConstrcutor;
            const Middleware = new MiddlewarePrototype();
            Middleware.ctx = ctx;
            Middleware.next = next;
            const res = await MiddlewareConstrcutor[ware.middlewareName].call(Middleware, ware.params);
            if (!res) {
              // await next();
            } else {
              ctx.state.data = res;
            }
          })
        })
    })
  }

  /** 测试内置中间件 */
  redisterMiddleware() {
    innerMiddleware.forEach(middle => {
      const ware: any = middle;
      if (ware.then) {
        ware.then(res => {
          this.app.server.use(res as any)
        })
      } else {
        this.app.server.use(ware)
      }

    })
  }

  /** 注册less中间件 */
  registerLessMiddleware() {
    const res = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './server/middleware/less'));
    Object.keys(res).forEach(key => {
      this.app.server.use(res[key]())
    })
  }

}

export = MiddlewareContructor;