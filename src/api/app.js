import requset from '../utils/request'

/**
 * @description: 获取服务器时间戳
 * @param {*}
 * @return {*}
 */
export function getTs() {
	return requset(`/sys-gateway/sign/ts`, {
		method: 'GET',
		data,
	})
}

export default { getTs }
