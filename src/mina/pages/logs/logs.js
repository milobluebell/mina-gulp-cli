//logs.js
import util from './../../utils/util';
import logsStore from './logs.store';

const store = getApp().store;
Page(store.link({

	store: logsStore,

	data: {
		logs: []
	},

	onLoad: function () {
		this.setData({
			logs: (wx.getStorageSync('logs') || []).map(log => {
				return util.formatTime(new Date(log))
			})
		});
	},

	onShow: function (){
		console.log(store.set);
	}


}))
