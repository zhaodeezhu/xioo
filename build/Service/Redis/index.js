"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * redis连接
 * @version:
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 21:19:17
 */
var redis_1 = __importDefault(require("redis"));
var Redis = /** @class */ (function () {
    function Redis(_a) {
        var port = _a.port, host = _a.host, password = _a.password, db = _a.db;
        /** 端口号 */
        this.port = 6379;
        /** 地址 */
        this.host = '127.0.0.1';
        /** 密码 */
        this.password = '';
        this.port = port;
        this.host = host;
        this.password = password;
        this.db = db;
        this.connect();
    }
    /** 连接 */
    Redis.prototype.connect = function () {
        var _this = this;
        if (!this.dbnet) {
            var connection_1 = redis_1.default.createClient({
                port: this.port,
                host: this.host,
                password: this.password,
                db: this.db
            });
            connection_1.on('connect', function () {
                console.log('Redis client connected' + _this.host + ':' + _this.port);
                _this.dbnet = connection_1;
            });
            connection_1.on('error', function (error) {
                console.log('Redis client error');
                console.log(error);
            });
        }
    };
    /** 设置字符数据 */
    Redis.prototype.setString = function (key, data, time) {
        this.dbnet.set(key, data, redis_1.default.print);
        if (time) {
            this.dbnet.expire(key, time);
        }
    };
    /** 获取字符数据 */
    Redis.prototype.getString = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbnet.get(key, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    return Redis;
}());
module.exports = Redis;
