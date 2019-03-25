const store = getApp().store;
const logsStore = store.create('logs', {
    
    // values被监听的值
    values: {
        compName: 'breadcrum',
        currIndex: 0
    },

    //


});

export default logsStore;