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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var index_1 = __importDefault(require("./index"));
var path = __importStar(require("path"));
var PluginManager = /** @class */ (function (_super) {
    __extends(PluginManager, _super);
    function PluginManager(app) {
        var _this = _super.call(this, app) || this;
        /** 插件组 */
        _this.plugins = {};
        _this.registerProjectPlugins();
        return _this;
    }
    /** 注册目录中的插件 */
    PluginManager.prototype.registerProjectPlugins = function () {
        var projectPlugins = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './server/plugins'));
        var plugins = Object.values(projectPlugins);
        this.registerPlugin(plugins);
    };
    /** 注册插件 */
    PluginManager.prototype.registerPlugin = function (plugins) {
        var _this = this;
        if (Array.isArray(plugins)) {
            plugins.forEach(function (item) {
                _this.writePlugin(item);
            });
        }
        else {
            this.writePlugin(plugins);
        }
    };
    PluginManager.prototype.writePlugin = function (PluginTarget) {
        var pluginInstance = new PluginTarget(this.app);
        pluginInstance.excute && pluginInstance.excute();
        var pluginName = pluginInstance.constructor.name;
        this.plugins[pluginName] = pluginInstance;
    };
    return PluginManager;
}(index_1.default));
module.exports = PluginManager;
