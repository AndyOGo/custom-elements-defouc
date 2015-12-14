var posthtml = require('posthtml');

module.exports = function () {
	return function PLUGIN_FN(tree) {
		console.log(tree);
	};
};

module.exports.process = function (contents, options) {
	return posthtml().use(module.exports(options)).process(contents);
};
