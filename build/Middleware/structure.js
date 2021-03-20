"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 中间件类列表 */
exports.middlewareClassList = [];
/** 中间件前置列表 */
exports.middlewareFrontList = [];
/** 中间件后置列表 */
exports.middlewareEndList = [];
/** 装饰类 */
function MiddleClass() {
    return function (constrcutor) {
        exports.middlewareClassList.push({
            Constrcutor: constrcutor
        });
    };
}
exports.MiddleClass = MiddleClass;
/** 装饰中间件 */
function Middle(position, execute, params) {
    if (position === void 0) { position = 'front'; }
    if (execute === void 0) { execute = true; }
    if (params === void 0) { params = {}; }
    return function (target, middlewareName, descriptor) {
        var middleware = {
            target: target,
            middlewareName: middlewareName,
            controller: descriptor.value,
            position: position,
            execute: execute,
            params: params
        };
        if (position = 'front') {
            exports.middlewareFrontList.push(middleware);
        }
        else {
            exports.middlewareEndList.push(middleware);
        }
    };
}
exports.Middle = Middle;
