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
var index_1 = __importDefault(require("./index"));
var structure_1 = require("./structure");
var inner_1 = __importDefault(require("./inner"));
var MiddlewareContructor = /** @class */ (function (_super) {
    __extends(MiddlewareContructor, _super);
    function MiddlewareContructor(app) {
        var _this = _super.call(this, app) || this;
        _this.innerMiddleware = inner_1.default;
        _this.app.helper.dirTreeSource(path.join(_this.app.readRoot, './server/middleware'));
        return _this;
        // this.registerLessMiddleware();
    }
    /** 注册自定义中间件 */
    MiddlewareContructor.prototype.registerMiddleware = function (position) {
        var _this = this;
        var middlewareList = position === 'front' ? structure_1.middlewareFrontList : structure_1.middlewareEndList;
        structure_1.middlewareClassList.forEach(function (item) {
            var Constrcutor = item.Constrcutor;
            var MiddlewareConstrcutor = new Constrcutor(_this.app);
            middlewareList
                .filter(function (middle) { return Constrcutor.prototype === middle.target; })
                .forEach(function (ware) {
                _this.app.server.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
                    function MiddlewarePrototype() { this.ctx = null; }
                    var Middleware, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                MiddlewarePrototype.prototype = MiddlewareConstrcutor;
                                Middleware = new MiddlewarePrototype();
                                Middleware.ctx = ctx;
                                return [4 /*yield*/, MiddlewareConstrcutor[ware.middlewareName].call(Middleware, ware.params)];
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
    };
    /** 测试内置中间件 */
    MiddlewareContructor.prototype.redisterMiddleware = function () {
        var _this = this;
        inner_1.default.forEach(function (middle) {
            var ware = middle();
            if (ware.then) {
                ware.then(function (res) {
                    _this.app.server.use(res);
                });
            }
            else {
                _this.app.server.use(ware);
            }
        });
    };
    /** 注册less中间件 */
    MiddlewareContructor.prototype.registerLessMiddleware = function () {
        var _this = this;
        var res = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './server/middleware/less'));
        Object.keys(res).forEach(function (key) {
            _this.app.server.use(res[key]());
        });
    };
    return MiddlewareContructor;
}(index_1.default));
module.exports = MiddlewareContructor;
