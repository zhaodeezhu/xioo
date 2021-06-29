import Plugin from '../index';
import koaStatic from 'koa-static';
import path from 'path';

export = class StaticResource extends Plugin {
  excute() {
    const { projectRoot, config: { rests } } = this.app;
    const { openResource } = rests;
    if(!openResource) return;
    if(typeof openResource === 'string') {
      this.app.server.use(koaStatic(path.join(projectRoot, openResource), { maxAge: 60 * 60 * 1000 * 2 }));
    } else if (Array.isArray(openResource)) {
      openResource.forEach(root => {
        this.app.server.use(koaStatic(path.join(projectRoot, root), { maxAge: 60 * 60 * 1000 * 2 }));
      })
    }
  }
}