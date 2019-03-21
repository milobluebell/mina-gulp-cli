/**
 * @function     小程序全局状态管理
 * @description  **
 */
import StoreProto from './StoreProto';

class $Store extends StoreProto {

    // 全局store，会注入到所有使用store的page和component
    store = {}

    constructor (storeOptions) {
        // 必须是对象
        if (storeOptions && typeof storeOptions === 'object') {
            try {
                this.store = {}
            } catch (err) {
                
            };
        }
    }

}

export default $Store;