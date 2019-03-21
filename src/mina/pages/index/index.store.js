const store = getApp().store;
const indexStore = store.create('index', {
    
    // values 被监听的值
    values: {
        a: '3333',
        test: 'testInIndexStore',
        breadCrum: [1, 2, 3, 4, 5],
    },

    // 
    actions: {

        // TODO: 通过action操作values

        a: function (){
            console.log('a');
        },

        b: function (){
            console.log('b');
        },

        c: function (){
            console.log('c');
        }

    }

    //


});

export default indexStore;