/**
 * @function     小程序全局状态管理
 * @description  **
 */
import StoreProto from './StoreProto';

class $Store extends StoreProto {

    constructor () { super() }

    // 全局store
    store = {
        index: {
            a: '1234',
        },
        breadCrum: ['我', '和', '你', '还', '是', '他'],
        navTitle: '测试一下呗',
        breads: [
            {
                name: '第一个',
                value: 1
            },{
                name: '第二个',
                value: 2
            },{
                name: '第三个',
                value: 3
            }
        ],
    }

}

export default $Store;
