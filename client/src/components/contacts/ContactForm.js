import e from 'express';
import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	const onChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({
			ame: '',
			email: '',
			phone: '',
			type: 'personal',
		});
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>Add Contact</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone Number'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			{/*If type is personal, check this option; by defualt, personal will be checked */}
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>
			Professional
			{/* Submit Button */}
			<div>
				<input
					type='submit'
					className='btn btn-primary btn-block'
					value='Add Contact'
				/>
			</div>
		</form>
	);
};

export default ContactForm;