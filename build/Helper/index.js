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
/*
 * @Descripttion: 工具函数库，主要提供一些通用的方法
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-18 17:07:09
 */
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var colors_1 = __importDefault(require("colors"));
var colorConsole = ['green', 'red', 'yellow', 'blue', 'magenta', 'cyan', 'gray', 'grey', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgGray', 'bgGrey'];
var modelConsole = ['underline', 'inverse', 'bold', 'reset', 'italic', 'strikethrough'];
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getDirToFilePath = function (dirPath, exclude) {
        if (exclude === void 0) { exclude = []; }
        var filePathMap = {};
        function getData(nd, frontFileName) {
            fs.readdirSync(nd).forEach(function (p) {
                if (fs.statSync(path.join(nd, p)).isDirectory()) {
                    getData(path.join(nd, p), p);
                }
                else {
                    var f = p.split('.');
                    var key = path.join(frontFileName, f[0]);
                    filePathMap[key] = path.join(nd, p);
                }
            });
        }
        if (exclude.length > 0) {
            exclude.forEach(function (exdir) {
                var dir = path.join(dirPath, exdir);
                getData(dir, '');
            });
        }
        else {
            getData(dirPath, '');
        }
        return filePathMap;
    };
    Util.getDirToFileSource = function (dirPath) {
        var filePathMap = Util.getDirToFilePath(dirPath);
        var sourceMap = {};
        Object.keys(filePathMap).forEach(function (p) {
            var Ob = require(filePathMap[p]);
            if (Ob['default']) {
                Ob = Ob['default'];
            }
            sourceMap[p] = Ob;
        });
        return sourceMap;
    };
    Util.dirTreePath = function (rootDir, exclude, includeFiles, include, isFirst) {
        if (exclude === void 0) { exclude = []; }
        if (includeFiles === void 0) { includeFiles = []; }
        if (include === void 0) { include = []; }
        if (isFirst === void 0) { isFirst = true; }
        // 定义所有的目录映射
        var pathMap = {};
        // 判断目录是否存在，不存在直接返回空对象{}
        var isExists = fs.existsSync(rootDir);
        if (!isExists)
            return {};
        function getData(nd, frontFileName, isFile) {
            if (isFile === void 0) { isFile = true; }
            fs.readdirSync(nd).forEach(function (p) {
                // 如果当当前遍历到目录名，剧排除掉
                if (exclude.includes(p))
                    return;
                if (fs.statSync(path.join(nd, p)).isDirectory()) {
                    var myFile = true;
                    // 适配只遍历响应的目录下的文件
                    if (include.length > 0) {
                        if (include.includes(p)) {
                            myFile = true;
                        }
                        else {
                            myFile = false;
                        }
                    }
                    getData(path.join(nd, p), path.join(nd, p), myFile);
                }
                else {
                    if (includeFiles.length > 0) {
                        var fileName = includeFiles.find(function (filePath) {
                            // 如果是正则校验p文件是否是满足
                            if (filePath instanceof RegExp) {
                                return filePath.test(p);
                            }
                            else {
                                // 不是正则就要判断相等
                                return filePath === p;
                            }
                        });
                        // 不正确就直接返回了
                        if (!fileName)
                            return;
                    }
                    if (include.length > 0) {
                        // 如果是不想遍历的目录则直接返回
                        if (!isFile) {
                            return;
                        }
                    }
                    var f = p.split('.');
                    var key = path.join(frontFileName, f[0]);
                    pathMap[key] = path.join(nd, p);
                }
            });
        }
        getData(rootDir, '', isFirst);
        return pathMap;
    };
    Util.dirTreeSource = function (rootDir, exclude, includeFiles, include, isFirst) {
        if (exclude === void 0) { exclude = []; }
        if (includeFiles === void 0) { includeFiles = []; }
        if (include === void 0) { include = []; }
        if (isFirst === void 0) { isFirst = true; }
        var pathMap = Util.dirTreePath(rootDir, exclude, includeFiles, include, isFirst);
        var sourceMap = {};
        Object.keys(pathMap).forEach(function (p) {
            var Ob = require(pathMap[p]);
            if (Ob['default']) {
                Ob = Ob['default'];
            }
            sourceMap[p] = Ob;
        });
        return sourceMap;
    };
    Util.makeType = function (dir, fileName, inter) {
        if (inter === void 0) { inter = 'Service'; }
        var projectRoot = process.cwd();
        // 正常配置的
        var res = Helper.getDirToFileSource(path.join(projectRoot, "./app/server/" + dir));
        // 业务模块相关的
        var modules = Helper.dirTreeSource(path.join(projectRoot, './app/pages'), [], [], [fileName], false);
        // 将两种合并
        res = __assign(__assign({}, res), modules);
        var classCode = "";
        var importCode = "";
        if (res.length === 0) {
            return;
        }
        Object.keys(res).forEach(function (key) {
            var ServiceClass = res[key];
            var instanceService = new ServiceClass('');
            var serviceName = instanceService.constructor.name;
            var interfaceCodeitem = "";
            if (key.indexOf('pages') > -1) {
                var servicePath = key.split('pages')[1];
                importCode += "\n          import " + serviceName + " from '../app/pages" + servicePath + "';\n        ";
            }
            else {
                importCode += "\n          import " + serviceName + " from '../app/server/" + fileName + "/" + key + "';\n        ";
            }
            interfaceCodeitem = "\n        interface I" + serviceName + " {\n          " + interfaceCodeitem + ";\n        }\n\n      ";
            classCode += "\n        " + serviceName + ": " + serviceName + "\n      ";
        });
        var declareFileCode = "\n      import 'xioo';\n      " + importCode + "\n      declare module 'xioo' {\n        \n        export interface I" + inter + " {\n          " + classCode + "\n        }\n      }\n    ";
        fs.writeFileSync(path.join(projectRoot, "./typings/" + fileName + ".d.ts"), declareFileCode);
    };
    return Util;
}());
/** 工具函数类 */
var Helper = /** @class */ (function (_super) {
    __extends(Helper, _super);
    function Helper() {
        var _this = _super.call(this) || this;
        _this.addGlobalConsoleColor();
        return _this;
    }
    Helper.prototype.getDirToFilePath = function (dirPath, exclude) {
        if (exclude === void 0) { exclude = []; }
        var filePathMap = {};
        var isExists = fs.existsSync(dirPath);
        if (!isExists)
            return {};
        function getData(nd, frontFileName) {
            fs.readdirSync(nd).forEach(function (p) {
                if (fs.statSync(path.join(nd, p)).isDirectory()) {
                    getData(path.join(nd, p), path.join(nd, p));
                }
                else {
                    var f = p.split('.');
                    var key = path.join(frontFileName, f[0]);
                    filePathMap[key] = path.join(nd, p);
                }
            });
        }
        if (exclude.length > 0) {
            exclude.forEach(function (exdir) {
                var dir = path.join(dirPath, exdir);
                getData(dir, '');
            });
        }
        else {
            getData(dirPath, '');
        }
        return filePathMap;
    };
    Helper.prototype.getDirToFileSource = function (dirPath, exclude) {
        if (exclude === void 0) { exclude = []; }
        var filePathMap = this.getDirToFilePath(dirPath, exclude);
        var sourceMap = {};
        Object.keys(filePathMap).forEach(function (p) {
            var Ob = require(filePathMap[p]);
            if (Ob['default']) {
                Ob = Ob['default'];
            }
            sourceMap[p] = Ob;
        });
        return sourceMap;
    };
    Helper.prototype.addGlobalConsoleColor = function () {
        colorConsole.forEach(function (color) {
            console[color] = function (value) {
                console.log(colors_1.default[color](value));
            };
            modelConsole.forEach(function (model) {
                console["" + color + model] = function (value) {
                    console.log(colors_1.default[color][model](value));
                };
            });
        });
    };
    /**
     * 获取某个目录下的所有文件路径，只要遇到exclude中的目录名，将会过滤到此目录所有一下的
     * @param { string } rootDir 要遍历的目录
     * @param { string[] } exclude 要排除的目录名
     * @param { string[] } includeFiles 指定的文件名，可以使用正则
     * @return { Object } 映射目录
     */
    Helper.prototype.dirTreePath = function (rootDir, exclude, includeFiles, include, isFirst) {
        if (exclude === void 0) { exclude = []; }
        if (includeFiles === void 0) { includeFiles = []; }
        if (include === void 0) { include = []; }
        if (isFirst === void 0) { isFirst = true; }
        // 定义所有的目录映射
        var pathMap = {};
        // 判断目录是否存在，不存在直接返回空对象{}
        var isExists = fs.existsSync(rootDir);
        if (!isExists)
            return {};
        function getData(nd, frontFileName, isFile) {
            if (isFile === void 0) { isFile = true; }
            fs.readdirSync(nd).forEach(function (p) {
                // 如果当当前遍历到目录名，剧排除掉
                if (exclude.includes(p))
                    return;
                if (fs.statSync(path.join(nd, p)).isDirectory()) {
                    var myFile = true;
                    // 适配只遍历响应的目录下的文件
                    if (include.length > 0) {
                        if (include.includes(p)) {
                            myFile = true;
                        }
                        else {
                            myFile = false;
                        }
                    }
                    getData(path.join(nd, p), path.join(nd, p), myFile);
                }
                else {
                    if (includeFiles.length > 0) {
                        var fileName = includeFiles.find(function (filePath) {
                            // 如果是正则校验p文件是否是满足
                            if (filePath instanceof RegExp) {
                                return filePath.test(p);
                            }
                            else {
                                // 不是正则就要判断相等
                                return filePath === p;
                            }
                        });
                        // 不正确就直接返回了
                        if (!fileName)
                            return;
                    }
                    if (include.length > 0) {
                        // 如果是不想遍历的目录则直接返回
                        if (!isFile) {
                            return;
                        }
                    }
                    var f = p.split('.');
                    var key = path.join(frontFileName, f[0]);
                    pathMap[key] = path.join(nd, p);
                }
            });
        }
        getData(rootDir, '', isFirst);
        return pathMap;
    };
    /**
     * 获取某个目录下所有文件的资源，使用require运行时获取
     * @param { string } rootDir 要遍历的目录
     * @param { string[] } exclude 要排除的目录名
     * @return { Object } 文件资源映射信息
     */
    Helper.prototype.dirTreeSource = function (rootDir, exclude, includeFiles, include, isFirst) {
        if (exclude === void 0) { exclude = []; }
        if (includeFiles === void 0) { includeFiles = []; }
        if (include === void 0) { include = []; }
        if (isFirst === void 0) { isFirst = true; }
        var pathMap = this.dirTreePath(rootDir, exclude, includeFiles, include, isFirst);
        var sourceMap = {};
        Object.keys(pathMap).forEach(function (p) {
            var Ob = require(pathMap[p]);
            if (Ob['default']) {
                Ob = Ob['default'];
            }
            sourceMap[p] = Ob;
        });
        return sourceMap;
    };
    return Helper;
}(Util));
module.exports = Helper;
