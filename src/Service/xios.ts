import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import * as querystring from 'querystring';
import * as fs from 'fs';

import FormData from 'form-data';

interface IXios {
  /** 基础的地址，用户可传 */
  baseUrl: string;
  /** get请求简单方法 */
  get: <T>(url: string, options: IOption) => Promise<T>;
  /** post请求方法 */
  post: <T>(url: string, options: IOption) => Promise<T>;
  /** 通用请求方法 */
  requset: <T>(options: IOption) => Promise<T>;
  /** 上传文件方法 */
  upload: <T>(url: string, file: any, options?: IOption) => Promise<T>;
  // /** 域名或ip */
  // host: string;
  // /** 端口号 */
  // port: string | number;
  // /** 前缀 */
  // prefix: string;
  /** 解析host port protocal prefix */
  // urlResolver: () => void;
}

interface IXiooProps {
  baseUrl?: string;
  headers?: any;
}

interface IOption {
  /** 请求路径 */
  url?: string;
  /** 请求方法 */
  method?: 'get' | 'post' | 'delete' | 'option' | 'patch' | 'put' | 'head';
  /** 请求头 */
  headers?: {[key:string]: any};
  /** 请求体 */
  data?: {[key:string]: any};
  /** 获取的数据类型 默认utf-8 */
  encoding?: string;
  /** 路径参数 */
  params?: { [key: string]: any }
}

class Xios implements IXios {
  baseUrl = '';
  private host = '';
  private port = '';
  private prefix = '';
  private xioo: typeof https | typeof http = https;
  private headers:any = {}

  constructor({baseUrl, headers}: IXiooProps) {
    this.baseUrl = baseUrl ? baseUrl : '';
    this.headers = headers ? headers : {};
    this.urlResolver();
  }

  // 解析host port protocal prefix
  private urlResolver() {
    if(!this.baseUrl) {
      return;
    }
    const xiooUrl = new url.URL(this.baseUrl);
    // 解析host 和 port
    this.host = xiooUrl.host.split(':')[0];
    this.prefix = xiooUrl.pathname;
    this.port = xiooUrl.port;
    this.xioo = xiooUrl.protocol === 'http:' ? http : https;
  }

  /** 解析url参数 */
  private urlParamsEncode(pathname: string, parmas) {
    if(!pathname) return new Error('url undefined');
    if(!parmas) return pathname;
    const hostname = 'http://127.0.0.1' + pathname;
    const paramsurl = new url.URL(hostname);
    const search = paramsurl.search;
    const query = querystring.encode(parmas);

    if (search) {
      return pathname + '&' + query
    } else {
      return pathname + '?' + query;
    }
  }

  get<T>(url, options: IOption = {}): Promise<T> {
    return this.requset({
      url,
      method: 'get',
      ...options
    })
  }

  post<T>(url, options: IOption = {}): Promise<T> {
    return this.requset({
      url,
      method: 'post',
      ...options
    })
  }

  requset<T extends string | any[] | any>(options: IOption = {}): Promise<T> {
    const {method, data, headers = {}, url, encoding = 'utf-8', params} = options;
    const lastUrl = params ? this.urlParamsEncode(url, params) : url

    return new Promise((resolve, reject) => {
      const postData = data ? JSON.stringify(data) : '';
      const op = {
        method: method ? method.toLocaleUpperCase() : 'POST',
        hostname: this.host,
        path: `${this.prefix === '/' ? '' : this.prefix}${lastUrl}`,
        port: this.port,
        headers: {
          ...this.headers,
          ...headers,
          "Content-Length": Buffer.byteLength(postData)
        }
      }

      const req = this.xioo.request(op, (res) => {
        let response: string | any[] = '';
        if(encoding !== 'utf-8') {
          response = [];
        }
        if(encoding === 'utf-8') {
          res.setEncoding(encoding as any);
        }
        
        res.on('data', (chunk) => {
          if(encoding === 'utf-8') {
            response += chunk;
          } else {
            (response as any[]).push(chunk);
          }
        });
        res.on('end', () => {
          if(encoding === 'utf-8') {
            resolve(response as T);
          } else {
            resolve({
              buffer: Buffer.concat(response as any[]),
              header: res.headers
            } as T)
          }
        });
      })
      req.on('error', (e) => {
        reject(e);
      });
      if(data) {
        req.end(JSON.stringify(data));
      } else {
        req.end();
      }
    });
  }

  upload<T extends any>(url: string, file, options: IOption = {}): Promise<T> {
    const form = new FormData();
    form.append('file', fs.createReadStream(file.path));
    if(options.data) {
      Object.keys(options.data).forEach(key => {
        form.append(key, (options.data as {[key: string]: any} )[key])
      });
    }
    const headers = form.getHeaders(); //这个不能少 
    if (options.headers) {
      Object.assign(headers, options.headers)
    }
    return new Promise((resolve, reject) => {
      const encoding = 'utf-8'
      const req = this.xioo.request({
        method: options.method ? options.method.toLocaleUpperCase() : 'POST',
        host: this.host,
        path: `${this.prefix}${url}`,
        port: this.port,
        headers: {
          ...headers
        }
      }, (res) => {
        let response: any = '';
        if (encoding !== 'utf-8') {
          response = [];
        }
        if (encoding === 'utf-8') {
          res.setEncoding(encoding as any);
        }
        res.on('data', (chunk) => {
          if (encoding === 'utf-8') {
            response += chunk;
          } else {
            (response as any[]).push(chunk);
          }
        });
        res.on('end', () => {
          if (encoding === 'utf-8') {
            resolve(response as T);
          } else {
            resolve({
              buffer: Buffer.concat(response as any[]),
              header: res.headers
            } as T)
          }
        });
      });
      form.pipe(req);
      req.on('error', (err) => {
        reject(err);
      })
    })
  }


}

export = Xios;