const opt = Object.prototype.toString
const isObject = (obj) => {
	return opt.call(obj) === '[object Object]'
}
module.exports = {
	isArray: (obj) => {
		return opt.call(obj) === '[object Array]'
	},

	isObject:isObject,

	isString: (obj) => {
		return opt.call(obj) === '[object String]'
	},

	isNumber: (obj) => {
		return opt.call(obj) === '[object Number]' && obj === obj // eslint-disable-line
	},

	isRegExp: (obj) => {
		return opt.call(obj) === '[object RegExp]'
	},

	isFile: (obj) => {
		return opt.call(obj) === '[object File]'
	},

	isBlob: (obj) => {
		return opt.call(obj) === '[object Blob]'
	},

	isUndefined: (obj) => {
		return obj === undefined
	},

	isNull: (obj) => {
		return obj === null
	},

	isFunction: (obj) => {
		return typeof obj === 'function'
	},

	isEmptyObject: (obj) => {
		return isObject(obj) && Object.keys(obj).length === 0
	},

	isExist: (obj) => {
		return obj || obj === 0
	},

	isWindow: (el) => {
		return el === window
	},
}
