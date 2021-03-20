"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*
 * @version:
 * @Author: dee
 * @Date: 2021-01-23 11:00:05
 * @LastEditors: dee
 * @LastEditTime: 2021-01-25 11:05:49
 */
var mysql_1 = __importDefault(require("mysql"));
var MysqlDB = /** @class */ (function () {
    function MysqlDB(config) {
        this.config = config;
        this.dbconnect();
    }
    MysqlDB.prototype.dbconnect = function () {
        var _this = this;
        var connection = mysql_1.default.createConnection(this.config);
        connection.connect(function (err) {
            if (err) {
                console.log('连接出错了');
                console.log(err);
            }
            else {
                _this.dbnet = connection;
                console.log('mysql成功连接！');
            }
        });
    };
    MysqlDB.prototype.dbquery = function (sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbnet.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
            });
        });
    };
    return MysqlDB;
}());
module.exports = MysqlDB;
