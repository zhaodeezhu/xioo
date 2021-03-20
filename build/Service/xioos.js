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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var url = __importStar(require("url"));
var Xioos = /** @class */ (function () {
    function Xioos(_a) {
        var baseUrl = _a.baseUrl, headers = _a.headers;
        this.baseUrl = '';
        this.host = '';
        this.port = '';
        this.prefix = '';
        this.xioo = https;
        this.headers = {};
        this.baseUrl = baseUrl ? baseUrl : '';
        this.headers = headers ? headers : {};
        this.urlResolver();
    }
    // 解析host port protocal prefix
    Xioos.prototype.urlResolver = function () {
        if (!this.baseUrl) {
            return;
        }
        var xiooUrl = new url.URL(this.baseUrl);
        // 解析host 和 port
        this.host = xiooUrl.host.split(':')[0];
        this.prefix = xiooUrl.pathname;
        this.port = xiooUrl.port;
        this.xioo = xiooUrl.protocol === 'http:' ? http : https;
    };
    Xioos.prototype.get = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var method = options.method, _a = options.headers, headers = _a === void 0 ? {} : _a;
        return new Promise(function (resolve, reject) {
            var op = {
                method: method ? method.toLocaleUpperCase() : 'GET',
                hostname: _this.host,
                path: "" + _this.prefix + url,
                port: _this.port,
                headers: __assign(__assign({}, _this.headers), headers)
            };
            var req = https.request(op, function (res) {
                var response = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    response += chunk;
                });
                res.on('end', function () {
                    resolve(JSON.parse(response));
                });
            });
            req.on('error', function (e) {
                reject(e);
            });
            req.end();
        });
    };
    Xioos.prototype.post = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var method = options.method, data = options.data, _a = options.headers, headers = _a === void 0 ? {} : _a;
        return new Promise(function (resolve, reject) {
            var postData = data ? JSON.stringify(data) : '';
            var op = {
                method: method ? method.toLocaleUpperCase() : 'POST',
                hostname: _this.host,
                path: "" + _this.prefix + url,
                port: _this.port,
                headers: __assign(__assign(__assign({}, _this.headers), headers), { "Content-Length": Buffer.byteLength(postData) })
            };
            var req = https.request(op, function (res) {
                var response = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    response += chunk;
                });
                res.on('end', function () {
                    resolve(JSON.parse(response));
                });
            });
            req.on('error', function (e) {
                reject(e);
            });
            if (data) {
                req.end(JSON.stringify(data));
            }
            else {
                req.end();
            }
        });
    };
    Xioos.prototype.requset = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var method = options.method, data = options.data, _a = options.headers, headers = _a === void 0 ? {} : _a, url = options.url, _b = options.encoding, encoding = _b === void 0 ? 'utf-8' : _b;
        return new Promise(function (resolve, reject) {
            var postData = data ? JSON.stringify(data) : '';
            var op = {
                method: method ? method.toLocaleUpperCase() : 'POST',
                hostname: _this.host,
                path: "" + (_this.prefix === '/' ? '' : _this.prefix) + url,
                port: _this.port,
                headers: __assign(__assign(__assign({}, _this.headers), headers), { "Content-Length": Buffer.byteLength(postData) })
            };
            var req = _this.xioo.request(op, function (res) {
                var response = '';
                if (encoding !== 'utf-8') {
                    response = [];
                }
                if (encoding === 'utf-8') {
                    res.setEncoding(encoding);
                }
                res.on('data', function (chunk) {
                    if (encoding === 'utf-8') {
                        response += chunk;
                    }
                    else {
                        response.push(chunk);
                    }
                });
                res.on('end', function () {
                    if (encoding === 'utf-8') {
                        resolve(response);
                    }
                    else {
                        resolve({
                            buffer: Buffer.concat(response),
                            header: res.headers
                        });
                    }
                });
            });
            req.on('error', function (e) {
                reject(e);
            });
            if (data) {
                req.end(JSON.stringify(data));
            }
            else {
                req.end();
            }
        });
    };
    return Xioos;
}());
module.exports = Xioos;
