/*
 * @version: 
 * @Author: dee
 * @Date: 2021-01-23 11:00:05
 * @LastEditors: dee
 * @LastEditTime: 2021-01-25 11:05:49
 */
import mysql from 'mysql';

interface IMySQL {
  /** 端口号 默认80 */
  port?: number;
  /** 地址 */
  host: string;
  /** 密码 */
  password?: string;
  /** 数据库 */
  database?: string;
  /** 用户名 */
  user: string;
}

class MysqlDB {
  
  dbnet: mysql.Connection;
  config: IMySQL;

  constructor(config: IMySQL) {
    this.config = config;
    this.dbconnect();
  }

  dbconnect() {
    const connection = mysql.createConnection(this.config);

    connection.connect(err => {
      if(err) {
        console.log('连接出错了');
        console.log(err);
      } else {
        this.dbnet = connection;
        console.log('mysql成功连接！')
      }
    })
  }

  dbquery(sql) {
    return new Promise((resolve, reject) => {
      this.dbnet.query(sql, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      })
    })
  }
}

export = MysqlDB;