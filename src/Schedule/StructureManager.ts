export const scheduleList = [];

export const taskList = [];

export function ScheduleComponent(status: boolean = true) {
  return (constrcutor: any) => {
    scheduleList.push({
      Constrcutor: constrcutor,
      status
    });
  };
}


interface ITaskProps {
  /** 任务名称，如果名称不存在将以方法名命名 */
  name?: string;
  /** corn表达式 */
  corn: string;
  /** 是否启用, 如果不存在以全局状态为准 */
  status?: boolean;
}

export function Task({name, corn, status}) {
  return (target: any, controllerName: string, descriptor: any) => {
    taskList.push({
      target,
      controllerName,
      controller: descriptor.value,
      name,
      corn,
      status
    });
  }
}