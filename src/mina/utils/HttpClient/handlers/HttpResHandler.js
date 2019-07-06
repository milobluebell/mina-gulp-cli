/**
 * @function     对httpClient请求回的数据进行处理
 * @description  **
 */

class HttpResHandler {

    // ✏️ TODO: 按需求处理返回数据
    responseHandler(res){
        return res;
    }
    
    // ✏️ TODO: 处理异常
    errorHandler (error) {
        return error;
    }

}

const httpResHandler = new HttpResHandler();
export default httpResHandler;