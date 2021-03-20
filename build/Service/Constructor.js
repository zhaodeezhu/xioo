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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * 构造服务连接
 * @version:
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 21:19:47
 */
var path = __importStar(require("path"));
var Redis_1 = __importDefault(require("./Redis"));
var MySQL_1 = __importDefault(require("./MySQL"));
var index_1 = __importDefault(require("./index"));
var ModelLsit = {
    redis: {
        group: 'redisGroup',
        TypeModel: Redis_1.default,
    },
    mysql: {
        group: 'mysqlGroup',
        TypeModel: MySQL_1.default,
    }
};
var ServiceConstructor = /** @class */ (function (_super) {
    __extends(ServiceConstructor, _super);
    function ServiceConstructor(app) {
        var _this = _super.call(this, app) || this;
        /** redis连接组 */
        _this.redisGroup = [];
        /** mysql连接组 */
        _this.mysqlGroup = [];
        /** 创建mysql连接 */
        _this.createConnectGroup('mysql');
        /** 创建redis连接 */
        _this.createConnectGroup('redis');
        /** 读取service信息 */
        _this.readService();
        return _this;
    }
    /** 创建连接分组 */
    ServiceConstructor.prototype.createConnectGroup = function (modelName) {
        var ModelTypeGroup;
        this[ModelLsit[modelName].group] = this.app.config[modelName].map(function (item) {
            return new ModelLsit[modelName].TypeModel(item);
        });
        ModelTypeGroup = this[ModelLsit[modelName].group];
        if (ModelTypeGroup.length > 0) {
            this[modelName] = ModelTypeGroup[0];
        }
    };
    /** 创建service */
    ServiceConstructor.prototype.readService = function () {
        var _this = this;
        var res = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/service'));
        var modules = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './pages'), [], [], ['service'], false);
        res = __assign(__assign({}, res), modules);
        /** 动态给对象添加值 */
        Object.keys(res).forEach(function (key) {
            var ServiceClass = res[key];
            var instanceService = new ServiceClass(_this.app);
            var serviceName = instanceService.constructor.name;
            _this[serviceName] = instanceService;
        });
    };
    return ServiceConstructor;
}(index_1.default));
;
module.exports = ServiceConstructor;
