//app.js
import $Http from './mina/utils/HttpClient/HttpClient';
import $Store from './mina/utils/Store/Store';

const store = new $Store();
App({
	onLaunch: function () {

		// ✏️ TODO: 发送请求示例
		$Http.get({
			url: '/app/mock/6799/global/getUserDetail'
		}).then(res=> {
			
		});

		// 展示本地存储能力
		let logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		})

		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})

	},
	globalData: {
		userInfo: null
	},
	store: store
})
