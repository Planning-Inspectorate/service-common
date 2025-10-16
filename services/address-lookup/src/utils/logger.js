const pinoLib = require('pino');
// const pretty = require("pino-pretty");

const pino = pinoLib({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			ignore: 'pid,hostname,time'
		}
	}
});

module.exports = pino;
