
/** 中间件类列表 */
export const middlewareClassList: any[] = [];

/** 中间件前置列表 */
export const middlewareFrontList: any[] = [];
/** 中间件后置列表 */
export const middlewareEndList: any[] = [];

/** 装饰类 */
export function MiddleClass() {
  return (constrcutor: any) => {
    middlewareClassList.push({
      Constrcutor: constrcutor
    });
  }
}

/** 装饰中间件 */
export function Middle(position: 'front' | 'end' = 'front', execute: boolean = true, params: {[key: string]: any} = {} ) {
  return (target: any, middlewareName: string, descriptor: any) => {
    const middleware = {
      target,
      middlewareName,
      controller: descriptor.value,
      position,
      execute,
      params
    };
    if(position = 'front') {
      middlewareFrontList.push(middleware);
    } else {
      middlewareEndList.push(middleware);
    }
  }
}