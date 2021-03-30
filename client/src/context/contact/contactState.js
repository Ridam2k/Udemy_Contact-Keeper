import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';
import contactContext from './contactContext';

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Hermione Granger',
				email: 'hg@gmail.com',
				phone: '123-345-567',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Natasha Romanoff',
				email: 'nr@gmail.com',
				phone: '123-345-567',
				type: 'professional',
			},
			{
				id: 3,
				name: 'Temperence Brennan',
				email: 'tb@gmail.com',
				phone: '123-345-567',
				type: 'professional',
			},
			{
				id: 4,
				name: 'Chloe Decker',
				email: 'cd@gmail.com',
				phone: '123-345-567',
				type: 'personal',
			},
		],
		current: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Add contact
	const addContact = (contact) => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	//Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	//Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//Update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};
	//Filter contacts

	//Clear filter

	return (
		<contactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
			}}
		>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
