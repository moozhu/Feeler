import utils from 'utils';

/**
 *
 * @param value
 * @param required {Boolean}
 * @param validate {Function}
 * @param msg {String} missing,error
 *
 */
let Validator = function (datas, callback) {
	var self = this;

	self.regExps = {
		email: /^[\w-]+@[a-zA-Z0-9]+(\.[a-zA-Z]{1,3})$/,
		phone: /^1[3456789]{1}\d{9}$/,
		password: /^\b(?![0-9]+$)(?![a-z]+$)[a-z0-9]{8,}\b$/i, //至少8位，只能由数字和字母组成
		chinese: /[\u4e00-\u9fa5]/
	};

	self.quit = false;
	self.datas = datas;
	for (var i = 0; i < self.datas.length; i++) {
		var data = self.datas[i];
		if (data.required && !utils.isCorrectVal(data.value)) {
			self.quit = true;

			Toast.show({
                text: data.msg.missing
            });

			break;
		} else if (typeof data.validate === "function") {

			let result = data.validate.call(self);
			if (result !== true) {
				self.quit = true;

				let msg = (typeof result === 'string') ? result : data.msg.error;
				
				Toast.show({
					text: msg
				});

				break;
			}
		}
	}
	if (self.quit) return;
	callback && callback();
};
function validator(datas, callback) {
	return new Validator(datas, callback);
};

export default validator;