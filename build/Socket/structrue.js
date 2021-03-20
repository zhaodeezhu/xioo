"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 命名空间列表 */
exports.namespaceList = [];
/** 控制器列表 */
exports.controllerList = [];
function Route(namespace) {
    return function (constrcutor) {
        exports.namespaceList.push({
            Constrcutor: constrcutor,
            namespace: namespace
        });
    };
}
exports.Route = Route;
function Path(path) {
    return function (target, controllerName, descriptor) {
        exports.controllerList.push({
            target: target,
            path: path,
            controllerName: controllerName,
            controller: descriptor.value
        });
    };
}
exports.Path = Path;
