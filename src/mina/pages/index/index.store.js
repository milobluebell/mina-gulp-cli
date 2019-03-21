const store = getApp().store;
const indexStore = store.create('index', {
    
    store: {
        test: '',
        breadCrum: [1, 2, 3, 4, 5],
    },

    actions: {
        a: function (){
            console.log(a);
        },
        b: function (){
            console.log(b);
        }
    }

});

export default indexStore;