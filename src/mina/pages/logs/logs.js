//logs.js
import util from './../../utils/util';
import IndexStore from './../index/index.store';

const store = getApp().store;
Page(store.link(IndexStore, {

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
		
	}


}))
