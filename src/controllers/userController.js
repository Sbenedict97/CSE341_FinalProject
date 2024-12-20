const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const getProfile = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
	try {
		if (!req.user) return res.status(401).json({ error: "Unauthorized" });
		const allowedUpdates = ["name", "email"];
		const updates = {};
		for (let key of allowedUpdates) {
			if (req.body[key] !== undefined) {
				updates[key] = req.body[key];
			}
		}
		const options = { new: true };
		const user = await User.findByIdAndUpdate(req.user._id, updates, options);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const { username, email, displayName, phone, country } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});

		if (existingUser) {
			return res.status(400).json({
				error: "User with this email or username already exists",
			});
		}

		const user = new User({
			username,
			email,
			displayName,
			phone,
			country,
		});

		await user.save();
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getUserById,
	getAllUsers,
	updateProfile,
	createUser,
	getProfile,
};
