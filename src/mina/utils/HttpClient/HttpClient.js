/**
 * @function     基于Promise封装的小程序wx.request，更贴合现代前端，避免陷入回调地狱。
 * @description  **
 */
import HttpResHandler from './handlers/HttpResHandler';
import { MOCK_HOST } from './host';

class $Http {

    // TODO: 做请求方法的配置 ✏️
    configs = {
        baseUrl: MOCK_HOST,
        headers: {
            'Authorization': wx.getStorageSync('Authorization') || '',
        }
    }

    // get方法
    get (...args) {
        if (args && args.length === 1 && typeof args[0] === 'string') {
            // 支持形如 $http.get('https://www.testUrl.com?testKey=1234').then(res=>{})的请求
            this.request('GET', { url: args[0] });
        } else {
            const params = args[0];
            this.request('GET', params);
        }
    }

    // post方法
    post(params) {
        return this.request('POST', params);
    }

    // main
    request = (method, params = {}) => {
        return new Promise((resolve, reject) => {
            wx.request({
                // TODO: 修改MOCK_HOST ✏️
                url: this.configs.baseUrl + params.url,
                method,
                header: Object.assign(this.configs.headers, params.headers || {}),
                data: params.data,
                success: res => {
                    // TODO: 填写要执行的正确响应的处理 ✏️
                    return resolve(HttpResHandler.responseHandler(res.data));
                },
                fail: err => {
                    // TODO: 填写要执行的错误响应的处理 ✏️
                    HttpResHandler.errorHandler(err);
                    reject(err);
                }
            })
        });
    }

}

const $http = new $Http();
export default $http;
