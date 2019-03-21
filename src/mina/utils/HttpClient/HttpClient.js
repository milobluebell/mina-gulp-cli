/**
 * @function     基于Promise封装的小程序wx.request，更贴合现代前端，避免陷入回调地狱。
 * @description  **
 */
import HttpResHandler from './handlers/HttpResHandler';
import { MOCK_HOST } from './host';

// headers
const headers = {
    'Authorization': '',
}

// main
const request = (url, data, method, header)=> {
    if (typeof url === 'string' && typeof method === 'string') {
        return new Promise((resolve, reject) => {
            wx.request({
                // ✏️ TODO: 修改MOCK_HOST
                url: MOCK_HOST + url || '',
                method,
                header,
                data,
                success: res=> {
                    // ✏️ TODO: 填写要执行的正确响应的处理
                    resolve(res.data);
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

// Class
class $Http {

    // get方法
    static get (...args) {
        if(args.length === 1 && typeof args[0] === 'string'){
            return request(args[0], {}, 'GET', headers);
        }else{
            const params = args[0];
            return request(params.url, params.data, 'GET', Object.assign(headers, params.headers || {}));
        }
    }

    // post方法
    static post (params) {
        request(params.url, params.data, 'POST', Object.assign(headers, params.headers));
    }

    // put方法
    static put (params) {
        request(params.url, params.data, 'PUT', Object.assign(headers, params.headers));
    }

}


export default $Http;
