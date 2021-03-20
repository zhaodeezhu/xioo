"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = ['post', 'get', 'patch', 'delete', 'put', 'head'];
/** 路由列表 */
exports.routerList = [];
/** 控制器列表 */
exports.controlllerList = [];
/** 装饰controler */
function Route(basepath) {
    return function (constrcutor) {
        exports.routerList.push({
            Constrcutor: constrcutor,
            basepath: basepath
        });
    };
}
exports.Route = Route;
/** 请求方法创建的工厂 */
function Method(method) {
    return function (path) { return function (target, controllerName, descriptor) {
        exports.controlllerList.push({
            target: target,
            path: path,
            controllerName: controllerName,
            method: method,
            controller: descriptor.value
        });
    }; };
}
exports.Method = Method;
/** 请求Get方法 */
exports.Get = Method('get');
/** 请求Post方法 */
exports.Post = Method('post');
/** 请求delete方法 */
exports.Delete = Method('delete');
/** 请求Patch方法 */
exports.Patch = Method('patch');
/** 请求put方法 */
exports.Put = Method('put');
/** 请求head方法 */
exports.Head = Method('head');
