export const methods = ['post', 'get', 'patch', 'delete', 'put', 'head'];

export type IMethod = 'post' | 'get' | 'patch' | 'delete' | 'put' | 'head';

/** 路由列表 */
export const routerList: any[] = [];

/** 控制器列表 */
export const controlllerList: any[] = [];

/** 装饰controler */
export function Route(basepath: string) {
  return (constrcutor: any) => {
    routerList.push({
      Constrcutor: constrcutor,
      basepath
    });
  };
}

/** 请求方法创建的工厂 */
export function Method(method: IMethod) {
  return (path: string | RegExp) => (target: any, controllerName: string, descriptor: any) => {
    controlllerList.push({
      target,
      path,
      controllerName,
      method,
      controller: descriptor.value
    });
  }
}

/** 请求Get方法 */
export const Get = Method('get');

/** 请求Post方法 */
export const Post = Method('post');

/** 请求delete方法 */
export const Delete = Method('delete');

/** 请求Patch方法 */
export const Patch = Method('patch');

/** 请求put方法 */
export const Put = Method('put');

/** 请求head方法 */
export const Head = Method('head');