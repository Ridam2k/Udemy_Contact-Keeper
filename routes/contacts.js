const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');

const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

//@route    GET api/contacts
//@desc     Get all contacts of a user
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		}); //Descending
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route    PUT api/contacts/:id
//@desc     Update a specific contact
//@access   Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//Build a new contact as an update to the previous one
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		//First perform checks on contact
		let contact = await Contact.findById(req.params.id);
		//Verify it exists
		if (!contact) return res.status(400).json({ msg: 'Contact not found' });
		//Verify user owns contact
		if (contact.user.toString() != req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		//Now update
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true } //Create if doesn't already exist
		);

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    DELETE api/contacts/:id
//@desc     Delete a specific contact
//@access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		//First perform checks on contact
		let contact = await Contact.findById(req.params.id);
		//Verify it exists
		if (!contact) return res.status(400).json({ msg: 'Contact not found' });
		//Verify user owns contact
		if (contact.user.toString() != req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		//Now delete
		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Contact Removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
