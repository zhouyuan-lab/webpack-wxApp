import api from './api.js' //引入同意管理的接口js
// import Toast from '../../vant-weapp/toast/index.js' //引入vant提示插件
// import {s4} from "../../utils/sm4.js"
import pwdEncrypt from "../../utils/pwdEncrypt/pwd"

Page({
	data: {
		motto: 'Hello World',
		userInfo: {
			avatarUrl: '',
			nickName: '',
		},
		hasUserInfo: false,
		canIUseGetUserProfile: wx.canIUse('getUserProfile'),
		canIUseNicknameComp: wx.canIUse('input.type.nickname'),
		//登录信息
		username: 'fawkes',
		password: 'OWndZi1mKZdC',
	},
	login() {
		if (!this.data.username.trim()) {
			// Toast('请输入正确的手机号')
			return
		}
		const password = pwdEncrypt(this.data.password)
		let data = {
			username: this.data.username,
			password,
			grant_type: 'password',
			scope: 'all',
		}
		api.login(data) //这里直接用api调用login即可
			.then((res) => {
				console.log('登录成功', res)
				// wx.reLaunch({
				// 	url: '../index/index',
				// })
			})
			.catch((err) => {
				console.log('登录失败', err)
			})
	},

	// bindViewTap() {
	// 	wx.navigateTo({
	// 		url: '../logs/logs',
	// 	})
	// },
	onChooseAvatar(e) {
		const { avatarUrl } = e.detail
		const { nickName } = this.data.userInfo
		this.setData({
			'userInfo.avatarUrl': avatarUrl,
			hasUserInfo:
				nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
		})
	},
	onInputChange(e) {
		const nickName = e.detail.value
		const { avatarUrl } = this.data.userInfo
		this.setData({
			'userInfo.nickName': nickName,
			hasUserInfo:
				nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
		})
	},
	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				console.log(res)
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true,
				})
			},
		})
	},
})
