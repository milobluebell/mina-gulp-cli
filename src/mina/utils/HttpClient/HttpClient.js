/**
 * @function     基于Promise封装的小程序wx.request，更贴合现代前端，避免陷入回调地狱。
 * @description  **
 */
import HttpResHandler from './handlers/HttpResHandler';
import { HOST } from './host';


class $Http {

    headers = {
        'Authorization': '',
    }

    // get方法
    get (...args) {
        if(args.length === 1 && typeof args[0] === 'string'){
            return this.request(args[0], {}, 'GET', this.headers);
        }else{
            const params = args[0];
            return this.request(params.url, params.data, 'GET', Object.assign(this.headers, params.headers));
        }
    }

    // post方法
    post (params) {
        this.request(params.url, params.data, 'POST', Object.assign(this.headers, params.headers));
    }

    // put方法
    put (params) {
        this.request(params.url, params.data, 'PUT', Object.assign(this.headers, params.headers));
    }
    
    // main
    request (url, data, method, header) {
        if (typeof url === 'string' && typeof method === 'string') {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: HOST + url || '',
                    method,
                    header,
                    data,
                    success: res=> {
                        // ✏️ TODO: 填写要执行的正确响应的处理
                        resolve(res);
                    },
                    fail: err=> {
                        // ✏️ TODO: 填写要执行的错误响应的处理
                        HttpResHandler.errorHandler(err);
                        reject(err);
                    },
                })
            })
        }else console.log('HttpClient接受的参数类型错误');
    }
}

export default new $Http;