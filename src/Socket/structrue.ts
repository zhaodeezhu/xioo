
/** 命名空间列表 */
export const namespaceList:any[] = [];

/** 控制器列表 */
export const controllerList:any[] = [];

export function Route(namespace: string) {
  return (constrcutor: any) => {
    namespaceList.push({
      Constrcutor: constrcutor,
      namespace
    });
  };
} 

export function Path(path: string) {
  return (target: any, controllerName: string, descriptor: any) => {
    controllerList.push({
      target,
      path,
      controllerName,
      controller: descriptor.value
    });
  }
}