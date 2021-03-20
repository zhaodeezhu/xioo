"use strict";
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
var koa_router_1 = __importDefault(require("koa-router"));
var structure_1 = require("./structure");
var router = new koa_router_1.default();
var projectRoot = process.cwd();
var Router = /** @class */ (function () {
    function Router(app) {
        this.app = app;
        this.readImport();
    }
    /** 注册路由，此处要修改 */
    Router.prototype.registerRouter = function () {
        this.app.server.use(router.routes());
        this.app.server.use(router.allowedMethods());
    };
    ;
    /** 写入controller信息 */
    Router.prototype.start = function () {
        var _this = this;
        structure_1.routerList.forEach(function (item) {
            var basepath = item.basepath, Constrcutor = item.Constrcutor;
            var RouterController = new Constrcutor(_this.app);
            structure_1.controlllerList
                .filter(function (controller) { return Constrcutor.prototype === controller.target; })
                .forEach(function (route) {
                var url;
                if (route.path instanceof RegExp) {
                    url = route.path;
                }
                else {
                    url = path.join(basepath, route.path);
                }
                router[route.method](url, function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
                    function ControllerPrototype() { this.ctx = null; }
                    var Controller, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ControllerPrototype.prototype = RouterController;
                                Controller = new ControllerPrototype();
                                Controller.ctx = ctx;
                                return [4 /*yield*/, RouterController[route.controllerName].call(Controller)];
                            case 1:
                                res = _a.sent();
                                if (!!res) return [3 /*break*/, 3];
                                return [4 /*yield*/, next()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                ctx.state.data = res;
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        this.readLess();
    };
    /** 读取动态的路径 */
    Router.prototype.readImport = function () {
        var _this = this;
        // 读取和页面相关的controllers
        // const pages = this.app.helper.dirTreePath(path.join(this.app.readRoot, './pages'), [], [], ['controllers'], false);
        // console.log(pages);
        this.app.helper.dirTreeSource(path.join(this.app.readRoot, './pages'), [], [], ['controllers'], false);
        var res = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/controllers'));
        Object.keys(res).forEach(function (key) {
            if (key.indexOf('less') > -1)
                return;
            var Con = res[key];
            new Con(_this.app);
        });
    };
    /**
     * 动态读取controller less信息
     * 重点是如何获取到底是什么请求
     * 既然不知道就全部注册一遍吧
     * 后续想想如何准备的注释
     * */
    Router.prototype.readLess = function () {
        var _this = this;
        var res = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/controllers'), ['less']);
        structure_1.methods.forEach(function (method) {
            Object.keys(res).forEach(function (url) {
                var result = '/less/' + url;
                router[method](result, function (ctx, next) {
                    res[url](_this.app, ctx, next);
                });
            });
        });
    };
    return Router;
}());
module.exports = Router;
