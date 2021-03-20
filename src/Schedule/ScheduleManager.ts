import * as path from 'path';
import { scheduleList, taskList } from './StructureManager';
import Schedule from './index';
import cornApp from 'node-cron';

interface ITask {
  status: boolean;
  task: cornApp.ScheduledTask
}

interface ISchedules {
  [key: string]: ITask
}

interface IRegisterProps {
  /** corn表达式 */
  corn: string;
  /** 任务名称 */
  name: string;
  /** 任务体 */
  handler: () => any;
  /** 是否启用 */
  status?: boolean;
}

class ScheduleManager extends Schedule {
  constructor(app) {
    super(app);
    this.initAllTask();
  }

  /** 定时任务列表 */
  tasks: ISchedules = {}

  /** 注册定时任务 */
  registerScheduleTask({corn, name, handler, status = true}: IRegisterProps) {
    this.tasks[name] = {
      status: status,
      task: cornApp.schedule(corn, handler, {scheduled: status})
    };
  }

  /** 初始化所有任务 */
  private initAllTask() {
    // 读取所有的定时任务文件
    this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/schedule'));
    console.log(scheduleList)
    scheduleList.forEach(item => {
      let {status, Constrcutor} = item;
      let ScheduleController = new Constrcutor(this.app);
      taskList
      .filter(task => Constrcutor.prototype === task.target)
      .forEach(task => {
        this.registerScheduleTask({
          corn: task.corn,
          name: task.name ? task.name : task.controllerName,
          handler: task.controller.bind(ScheduleController),
          status: task.status === undefined ? status : task.status
        })
      });
    });
  }

  /** 停止任务 */
  stop(name) {
    this.tasks[name].status = false;
    this.tasks[name].task.stop();
  }
  
  /** 开始任务 */
  start(name) {
    this.tasks[name].status = true;
    this.tasks[name].task.start;
  }

  /** 注册任务 */
  registerTask(props: IRegisterProps[]) {
    props.forEach(props => {
      this.registerScheduleTask(props);
    });
  }
}

export = ScheduleManager;