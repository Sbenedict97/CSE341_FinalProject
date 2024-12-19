module.exports = function errorHandler(err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";

	console.error("[Error]", err);
	res.status(status).json({ error: message });
};
