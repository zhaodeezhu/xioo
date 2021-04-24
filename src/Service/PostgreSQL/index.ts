import { Pool, PoolConfig } from 'pg';

class PostgreSQL {

  /** 连接实例 */
  pool: Pool;

  constructor({ launch, ...config }) {
    this.connect(config);
  }
  /**
   * 
   * {
      user: 'postgres',
      host: 'localhost',
      database: 'mytest',
      password: '123456',
      port: 5432,
    }
   */
  /** 连接 */
  private connect(config: PoolConfig) {
    this.pool = new Pool(config);
    console.gray(`${config.database} 连接了 ${config.port}`)
  }

  /** 查询 */
  query(sql: string) {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client, done) => {
        if (err) throw err
        client.query(sql, (err, res) => {
          done()
          if (err) {
            reject(err);
          } else {
            resolve(res.rows);
          }
        })
      })
    })
  }
}

export default PostgreSQL;