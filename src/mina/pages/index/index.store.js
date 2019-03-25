const store = getApp().store;
const indexStore = store.create('index', {
    
    // values 被监听的值
    values: {
        compName: 'breadcrum',
        choosedOne: 0,
        a: 'ok'
    },


});

export default indexStore;