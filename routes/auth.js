const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
// const { Mongoose } = require('mongoose');
const auth = require('../middleware/auth');

//@route    GET api/auth
//@desc     Get the logged in user
//@access   Private
router.get('/', auth, async (req, res) => {
	//The auth parameter protects this route
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

//@route    POST api/auth
//@desc     Send the user for authentication
//@access   Public

//Login a registered user: See if user exists,if yes, generate a token
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password id required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.sendStatus(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			//Check email
			let user = await User.findOne({ email });

			if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

			//Check passwords
			const isMatch = await bcrypt.compare(password, user.password); //We stored the hash password in the database

			if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

			//Grab user id and sign in with token
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
