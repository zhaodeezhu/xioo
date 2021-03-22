"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Config_1 = __importDefault(require("../Config"));
var Server_1 = __importDefault(require("../Server"));
var Helper_1 = __importDefault(require("../Helper"));
var Router_1 = __importDefault(require("../Router"));
var Controller_1 = __importDefault(require("../Controller"));
var Constructor_1 = __importDefault(require("../Service/Constructor"));
var Constructor_2 = __importDefault(require("../Middleware/Constructor"));
var SocketManger_1 = __importDefault(require("../Socket/SocketManger"));
var ScheduleManager_1 = __importDefault(require("../Schedule/ScheduleManager"));
var PluginManager_1 = __importDefault(require("../Plugin/PluginManager"));
var structure_1 = require("../Router/structure");
var xioos_1 = __importDefault(require("../Service/xioos"));
var App = /** @class */ (function () {
    function App() {
        /** 全局运行的目录 */
        this.projectRoot = process.cwd();
        /** 动态读取文件的目录 */
        this.readRoot = process.env.READ_ENV === 'prod' ? this.projectRoot + '/package' : this.projectRoot + '/app';
        /** 帮助函数集合 */
        this.helper = new Helper_1.default();
        /** 全局配置 */
        this.config = new Config_1.default(this);
        /** 数据层 */
        this.service = new Constructor_1.default(this);
        /** http服务 */
        this.server = new Server_1.default(this);
        /** 路由 */
        this.router = new Router_1.default(this);
        /** 中间件 */
        this.middleware = new Constructor_2.default(this);
        /** 定时任务 */
        this.schedule = new ScheduleManager_1.default(this);
        /** xioos请求列表 */
        this.xioos = {};
        /** ctx上下文 */
        this.ctx = this.server.ctx;
        // this.server = new Server(this);
        // 配置开启了socket以后再开起
        if (this.config.socketConfig.launch) {
            this.socket = new SocketManger_1.default(this);
        }
        this.redis = this.service.redis;
        this.createXioosRequest();
        // 注册插件，这个一定要在所有的服务都启动了以后注册
        this.plugin = new PluginManager_1.default(this);
        // 启动服务
        this.start(this.config.http.port);
    }
    /** 创建请求对象列表数据 */
    App.prototype.createXioosRequest = function () {
        var xioosConfig = this.config.xioos;
        if (!xioosConfig || typeof xioosConfig !== 'object')
            return;
        this.setXioosByConfig(xioosConfig);
    };
    /**
     * 按配置设置请求对象
     * 如果键值存在相同，将会跳过并且打印提醒
     */
    App.prototype.setXioosByConfig = function (xioosConfig) {
        var _this = this;
        Object.keys(xioosConfig).forEach(function (xiooskey) {
            if (_this.xioos[xiooskey]) {
                console.redunderline(xiooskey + "\u8BF7\u6C42\u5BF9\u8C61\u5DF2\u7ECF\u5B58\u5728\uFF0C\u8BBE\u7F6E\u5C06\u88AB\u8DF3\u8FC7\uFF01");
                return;
            }
            _this.xioos[xiooskey] = new xioos_1.default(__assign({}, xioosConfig[xiooskey]));
        });
    };
    /** 中间件逻辑处理 */
    /** 启动app */
    App.prototype.start = function (port) {
        var _this = this;
        this.socket && this.socket.listen(this.server.server);
        this.middleware.registerMiddleware("front");
        this.middleware.redisterMiddleware();
        this.middleware.registerLessMiddleware();
        this.router.start();
        this.router.registerRouter();
        this.middleware.registerMiddleware("end");
        this.server.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ctx.state['b'] = '3333333';
                console.log('我是真的后');
                return [2 /*return*/];
            });
        }); });
        /** 读取service信息 */
        // this.service.readService()
        this.server.start(port);
        console.red(process.env.NODE_ENV);
    };
    App.Get = structure_1.Get;
    App.Delete = structure_1.Delete;
    App.Post = structure_1.Post;
    App.Patch = structure_1.Patch;
    App.Route = structure_1.Route;
    App.Controller = Controller_1.default;
    return App;
}());
;
module.exports = App;
