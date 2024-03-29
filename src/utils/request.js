import { getSign } from "../api/request-sign.js";
import { verifyRequest, verifyResponse, verifyUrl } from '../api/verify-api.js';
import axios from 'axios-miniprogram'
import Toast from '@vant/weapp/toast/toast';
// base_url
// axios初始化实例
const axiosIns = axios.create({
	baseURL: 'http://139.9.139.61:88',
	timeout: 10000,
})
// request 请求拦截器,处理逻辑
axiosIns.interceptors.request.use(
	async (axiosConfig) => {
		const config = axiosConfig
		config.headers = {
			contentType: 'application/json;charset=UTF-8',
		}
            config.headers["Content-Type"] = "application/x-www-form-urlencoded"
		if (verifyUrl(config, 'sign')) {
			config.params = getSign(config.params)
		} else if (config.headers.isNeedToken === 'false') {
			config.headers['Fusion-Auth'] = ''
		} else {
			config.headers['Fusion-Auth'] = getToken() || ''
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
//  response拦截器
axiosIns.interceptors.response.use(
	(response) => {
        Toast.success('登录成功~');
		const responData = response.data
		// const { rtnFlag } = responData
		// 判断业务是否成功
		// if (rtnFlag !== '9999') {
		// 	// 失败
		// 	return Promise.reject(responData)
		// }
		// 成功
		return Promise.resolve(responData)
	},
	(err) => {
		return Promise.reject(err)
	}
)
export default axiosIns
