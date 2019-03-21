//logs.js
import util from './../../utils/util';

const store = getApp().store;
Page({

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

		console.log(store);

		this.setStore({
			logs: [1, 2, 3, 4],
			testObj: {
				a: {
					testGun: [5, 6, 7, 8],
					b: {
						c: {
							d: 1
						}
					}
				}
			}
		});

		setTimeout(()=> {
			this.setStore({
				logs: [1, 2],
				testObj: {
					b: {
						ok: 2
					}
				}
			});
		}, 2000);

		setTimeout(()=> {
			this.setData({
				logs: [1, 2, 3]
			})
		}, 4000);

	}


})
