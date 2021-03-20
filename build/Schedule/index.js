"use strict";
var StructureManager_1 = require("./StructureManager");
var Schedule = /** @class */ (function () {
    function Schedule(app) {
        this.app = app;
    }
    Schedule.ScheduleComponent = StructureManager_1.ScheduleComponent;
    Schedule.Task = StructureManager_1.Task;
    return Schedule;
}());
module.exports = Schedule;
