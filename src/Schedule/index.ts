import cornApp from 'node-cron';
import App from '../App';

import { ScheduleComponent, Task } from './StructureManager';

class Schedule {

  static ScheduleComponent = ScheduleComponent;
  static Task = Task;

  /** app上下文 */
  app: App

  constructor(app: App) {
    this.app = app;
  }
}

export = Schedule;