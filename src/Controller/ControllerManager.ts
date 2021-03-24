import Controller from './index';

class ControllerManager extends Controller {
  /** controller组 */
  group = {};
  /** 注册controller */
  registerController(name, CntrollerInstance) {
    this.group[name] = CntrollerInstance;
  }
}

export = ControllerManager;