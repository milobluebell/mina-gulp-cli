/**
 * @function     小程序全局状态管理
 * @description  **
 */
import StoreProto from './StoreProto';

class $Store extends StoreProto {

    constructor () { super() }

    // 全局store
    store = {
        test: 1
    }

}

export default $Store;
