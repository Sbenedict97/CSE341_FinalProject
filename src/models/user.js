const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	githubId: { type: String, unique: true },
	username: String,
	displayName: String,
	profileUrl: String,
	emails: [String],
});

module.exports = mongoose.model("User", userSchema);
