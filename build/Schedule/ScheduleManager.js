"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var path = __importStar(require("path"));
var StructureManager_1 = require("./StructureManager");
var index_1 = __importDefault(require("./index"));
var node_cron_1 = __importDefault(require("node-cron"));
var ScheduleManager = /** @class */ (function (_super) {
    __extends(ScheduleManager, _super);
    function ScheduleManager(app) {
        var _this = _super.call(this, app) || this;
        /** 定时任务列表 */
        _this.tasks = {};
        _this.initAllTask();
        return _this;
    }
    /** 注册定时任务 */
    ScheduleManager.prototype.registerScheduleTask = function (_a) {
        var corn = _a.corn, name = _a.name, handler = _a.handler, _b = _a.status, status = _b === void 0 ? true : _b;
        this.tasks[name] = {
            status: status,
            task: node_cron_1.default.schedule(corn, handler, { scheduled: status })
        };
    };
    /** 初始化所有任务 */
    ScheduleManager.prototype.initAllTask = function () {
        var _this = this;
        // 读取所有的定时任务文件
        this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/schedule'));
        console.log(StructureManager_1.scheduleList);
        StructureManager_1.scheduleList.forEach(function (item) {
            var status = item.status, Constrcutor = item.Constrcutor;
            var ScheduleController = new Constrcutor(_this.app);
            StructureManager_1.taskList
                .filter(function (task) { return Constrcutor.prototype === task.target; })
                .forEach(function (task) {
                _this.registerScheduleTask({
                    corn: task.corn,
                    name: task.name ? task.name : task.controllerName,
                    handler: task.controller.bind(ScheduleController),
                    status: task.status === undefined ? status : task.status
                });
            });
        });
    };
    /** 停止任务 */
    ScheduleManager.prototype.stop = function (name) {
        this.tasks[name].status = false;
        this.tasks[name].task.stop();
    };
    /** 开始任务 */
    ScheduleManager.prototype.start = function (name) {
        this.tasks[name].status = true;
        this.tasks[name].task.start;
    };
    /** 注册任务 */
    ScheduleManager.prototype.registerTask = function (props) {
        var _this = this;
        props.forEach(function (props) {
            _this.registerScheduleTask(props);
        });
    };
    return ScheduleManager;
}(index_1.default));
module.exports = ScheduleManager;
