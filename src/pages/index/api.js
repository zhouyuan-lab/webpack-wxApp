import axiosIns from '../../utils/request'

//params:地址 body:body
export default {
	login: (data) => {
		return axiosIns({ url: `/sys-auth/oauth/token`, method: 'POST', data })
	},
}
