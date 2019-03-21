class StoreProto {

    // 创建一个store
    create (name, storeLinked) {

        // TODO: 需要把actions也加入this中
        // component's store  --->  全局store
        Object.defineProperty(this.store, name, {
            value: storeLinked,
            configurable: true,
            writable: true
        });

        // component's store 加上name标记和标记只读
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
        return storeLinked;
    }

    // 连接一个store
    link (comp) {

        if (Boolean(comp.hasOwnProperty('store') && comp.store)) {
            // 必须指定了store
            const name = comp.store.__name__;
            const newData = JSON.parse(JSON.stringify(comp.data));
            Object.defineProperty(comp, 'data', {
                value: {
                    ...newData,
                    store: this.store[name].values
                },
                configurable: false,
                writable: true,
                enumerable: true
            });

            // 使用函数表达式，保证this指向调用对象，即每页的this
            comp.setStore = function (newStore, cb=function (){}){

                // 修改对应组件的data数据
                if(newStore && typeof newStore === 'object'){
                    if(cb && typeof cb === 'function'){
                        this.setData({
                            store: Object.assign(this.data.store, newStore)
                        }, cb());
                    } else {
                        this.setData({
                            store: Object.assign(this.data.store, newStore)
                        });
                    }
                    storeSetter(name, newStore);
                }

            };

            // 必须用箭头函数，保证调用的是本类
            // 修改此store的数据
            var storeSetter = (storeOwnerName, newStore)=> {
                if (storeOwnerName && typeof storeOwnerName === 'string' && newStore && typeof newStore === 'object') {
                    this.store[storeOwnerName] = Object.assign(this.store[storeOwnerName], newStore)
                }
            }
            
        } 

        return comp;
    }

}

export default StoreProto;