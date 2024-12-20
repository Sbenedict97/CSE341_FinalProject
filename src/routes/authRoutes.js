const express = require("express");
const passport = require("passport");
const router = express.Router();

// GitHub Login
router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub Callback
router.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/" }),
	(req, res) => {
		res.json({ message: "Login successful", user: req.user });
	}
);

// Logout
router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Failed to log out", error: err });
		}
		res.json({ message: "Logged out successfully" });
	});
});

module.exports = router;
