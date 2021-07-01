import Plugin from '../index';
import koaStatic from 'koa-static';
import path from 'path';

export = class StaticResource extends Plugin {
  excute() {
    const { config: { rests } } = this.app;
    const { openResource } = rests;
    if (!openResource) return;
    // 字符串直接注册
    if (typeof openResource === 'string') {
      this.resourceRegister(openResource);
    } else if (Array.isArray(openResource)) {
      openResource.forEach(item => {
        // 字符串直接注册
        if (typeof item === 'string') {
          this.resourceRegister(item);
        } else {
          // 对象，两种情况
          this.resourceObjectRegister(item);
        }
      })
      // 对象，直接去注册
    } else {
      this.resourceObjectRegister(openResource);
    }
  }

  /** 对象注册 */
  resourceObjectRegister(resourceObject) {
    const { openPath, options = {} } = resourceObject;
    const READ_ENV = process.env.READ_ENV || 'dev';
    if (openPath) {
      this.resourceRegister(openPath, options);
    } else {
      const item = resourceObject[READ_ENV];
      if(!item) return;
      const { openPath, options: itemOptions = {} } = item;
      this.resourceRegister(openPath, { ...options, ...itemOptions });
    }
  }

  /** 注册开放目录 */
  resourceRegister(openPath, options?: any) {
    const { server, projectRoot } = this.app;
    if(!openPath) return;
    if (options && typeof options === 'object') {
      server.use(koaStatic(path.join(projectRoot, openPath), options));
    } else {
      server.use(koaStatic(path.join(projectRoot, openPath)));
    }
  }

}