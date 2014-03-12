var app, cluster, host, i, numCPUs, port, server, _i;

app = module.exports = function(params) {
	params = params || {};
	params.root = params.root || __dirname;
	return require('compound').createServer(params);
};

cluster = require('cluster');

numCPUs = require('os').cpus().length;

console.log("numCPUs: ", numCPUs);

if (!module.parent) {
	port = process.env.PORT || 8888;
	host = process.env.HOST || "0.0.0.0";
	server = app();
	if (cluster.isMaster) {
		for (i = _i = 1; 1 <= numCPUs ? _i <= numCPUs : _i >= numCPUs; i = 1 <= numCPUs ? ++_i : --_i) {
			console.log("cluster fork()");
			cluster.fork();
		}
		cluster.on('exit', function(worker, code, signal) {
			return console.log('worker ' + worker.process.pid + ' died');
		});
	} else {
		server.listen(port, host, function() {
			return console.log("Compound server listening on %s:%d within %s environment", host, port, server.set('env'));
		});
	}
}


//just keep it running
process.on('uncaughtException', function(err) {
	console.warn(err);
});