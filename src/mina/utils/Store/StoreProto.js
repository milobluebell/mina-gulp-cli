
export default class StoreProto {

    constructor (this) {
        
    }

    // 创建store
    create (name, storeLinked) {
        Object.defineProperty(this.store, name, {
            value: storeLinked,
            configurable: true,
            writable: true
        });
        Object.defineProperties(storeLinked, {
            __name__: {
                value: name,
                configurable: false,
                writable: false
            },
            actions: {
                value: storeLinked.actions,
                configurable: false,
                writable: false
            }
        });
        console.log(this.store);
        return storeLinked;
    }

    // 连接store
    link (comp) {


        if (Boolean(comp.hasOwnProperty('store') && comp.store)) {
            
            // 指定了store
            const name = comp.store.__name__;
            console.log(this.store[name].store);
            Object.defineProperty(comp.data, 'store', {
                value: Object.assign(comp.data, this.store[name].store),
                configurable: false,
                writable: true,
                enumerable: true
            });
            console.log(comp.data);

            // 使用函数表达式，保证this指向调用对象，即每页的this
            comp.setStore = function (newStore, cb=function (){}){

                // 修改对应组件的数据
                if(cb && typeof cb === 'function' && newStore && typeof newStore === 'object'){
                    this.setData(Object.assign(this.data, newStore), cb());
                } else {
                    this.setData(Object.assign(this.data, newStore));
                }

                // 修改store的数据
                storeSetter(this.storeName, newStore, this);

            };

            // 使用箭头函数，保证this指向声明时位置
            var storeSetter = (storeOwnerName, newStore)=> {
                this.store[storeOwnerName] = Object.assign(this.store[storeOwnerName], newStore)
            }

        } else {
            // 没有指定store
            
        }
        return comp

    }
}