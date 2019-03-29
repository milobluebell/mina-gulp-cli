class StoreProto {

    // 观察队列
    observables = [];

    // 连接一个store
    link (storeLinked, comp) {
        if (storeLinked && comp){
            /**
             * 操作观察队列
             */
            const lifeTimes = {
                ent: ['onLoad', 'attached'],
                ext: ['onUnload', 'detached']
            };

            for(const i in lifeTimes){
                // 拦截生命周期，并且订阅对应组件
                if(i === 'ent'){
                    for (const lifeTimeName of lifeTimes[i]){
                        comp[lifeTimeName] = function (){
                            pushThatIntoObserverables(this);
                        }
                    }
                } else if (i === 'ext'){
                    for (const lifeTimeName of lifeTimes[i]){
                        comp[lifeTimeName] = function (){
                            removeThatFromObserverables(this);
                        }
                    }
                }
            }

            /**
             * 实例所连接的store，并且挂载到全局store上
             */
            const newClass = new storeLinked();
            const name = newClass.constructor.name.toString();
            this.store[name] = newClass;

            /**
             * 将store注入到data中，以触发view刷新
             */
            const newData = JSON.parse(JSON.stringify(comp.data));
            Object.defineProperties(comp, {
                'data': {
                    value: {
                        ...newData,
                        store: this.store[name].values
                    },
                    configurable: false,
                    writable: true,
                    enumerable: true
                }
            });

            /**
             * 赋予setStore方法
             */
            // 1，给page添加该方法
            comp.setStore = function (newStore, cb=function (){}){
                if(newStore && typeof newStore === 'object'){
                    storeChanger(name, newStore, cb() || function (){});
                } else {
                    console.log('setStore的参数不正确');
                }
            };

            // 2，给component添加该方法
            if(comp.methods){
                comp.methods = Object.assign(comp.methods, {
                    setStore: function (newStore, cb=function (){}){
                        if(newStore && typeof newStore === 'object'){
                            storeChanger(name, newStore, cb() || function (){});
                        } else {
                            console.log('setStore的参数不正确');
                        }
                    }
                });
            }

            // 每次onShow或attached时获取最新的store
            ['onShow', 'attached'].forEach(lifeTimeName=> {
                const originalLifeTimeName = comp[lifeTimeName];
                comp[lifeTimeName] = function (){
                    this.setStore(getStore(name).values);
                    originalLifeTimeName.call(this);
                }
            });

            var getStore = name=> {
                return this.getStore(name);
            }

            // 更改对应data
            var storeChanger = (storeOwnerName, newData, cb=function (){})=> {
                const promises = this.observables.map(item=> {
                    // 更改store
                    globalStoreHandler(storeOwnerName, newData);

                    // 更改对应data
                    return new Promise(resolve => {
                        item.setData({
                            store: Object.assign(item.data.store, newData)
                        }, resolve);
                    });
                });
                if(cb && typeof cb === 'function'){
                    Promise.all(promises).then(cb);
                } else {
                    Promise.all(promises);
                }
            }

            // 更改global store
            var globalStoreHandler = (storeOwnerName, newStore)=> {
                this.updateStore(storeOwnerName, newStore);
            }

            // 把元素加入观察列表
            var pushThatIntoObserverables = that=> {
                this.observables.push(that);
            }

            // 把元素移出观察列表
            var removeThatFromObserverables = that=> {
                const index = this.observables.findIndex(item => item === that);
                if (index > -1) {
                    this.observables.splice(index, 1)
                }
            }
            
        }

        return comp;

    }

    // 获取store
    getStore (storeOwnerName) {
        return this.store[storeOwnerName] || undefined;
    }

    // 更新store
    updateStore (storeKey, object) {
        const newStore = JSON.parse(JSON.stringify(this.store[storeKey]));
        if (storeKey && typeof storeKey === 'string' && object && typeof object === 'object') {
            this.store[storeKey].values = Object.assign(newStore.values, object);
        }
    }

}

export default StoreProto;
