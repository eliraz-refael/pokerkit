const serve = require('webpack-serve');
const static = require('koa-static');
const path = require('path');

const argv = {};
const config = require('../webpack.config.js');
// const host = '192.168.1.136';

serve(argv, { config }).then((result) => {
	
});