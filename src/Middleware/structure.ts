
/** 中间件类列表 */
export const middlewareClassList: any[] = [];

/** 中间件前置列表 */
export const middlewareFrontList: any[] = [];
/** 中间件后置列表 */
export const middlewareEndList: any[] = [];
/** 中间件中间列表 */
export const middlewareMiddleList: any[] = [];

/** 装饰类 */
export function MiddleClass() {
  return (constrcutor: any) => {
    middlewareClassList.push({
      Constrcutor: constrcutor
    });
  }
}

/** 装饰中间件 */
export function Middle(position: 'front' | 'end' | 'middle' = 'front', execute = true, params: {[key: string]: any} = {} ) {
  return (target: any, middlewareName: string, descriptor: any) => {
    const middleware = {
      target,
      middlewareName,
      controller: descriptor.value,
      position,
      execute,
      params
    };
    if(position === 'front') {
      middlewareFrontList.push(middleware);
    } else if(position === 'end') {
      middlewareEndList.push(middleware);
    } else {
      middlewareMiddleList.push(middleware);
    }
  }
}