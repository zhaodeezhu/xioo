"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleList = [];
exports.taskList = [];
function ScheduleComponent(status) {
    if (status === void 0) { status = true; }
    return function (constrcutor) {
        exports.scheduleList.push({
            Constrcutor: constrcutor,
            status: status
        });
    };
}
exports.ScheduleComponent = ScheduleComponent;
function Task(_a) {
    var name = _a.name, corn = _a.corn, status = _a.status;
    return function (target, controllerName, descriptor) {
        exports.taskList.push({
            target: target,
            controllerName: controllerName,
            controller: descriptor.value,
            name: name,
            corn: corn,
            status: status
        });
    };
}
exports.Task = Task;
