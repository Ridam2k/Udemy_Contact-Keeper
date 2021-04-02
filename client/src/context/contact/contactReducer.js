import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload], //Adds the received contact to the the existing contacts
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact.id !== action.payload
				),
				//Assign all contacts whose id is not the one passed to the state 'contacts' =>deleting the passed contact
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact.id === action.payload.id ? action.payload : contact
				),
				//Find the contact with the matching id : return the payload info for that particular contact
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi'); //global and case insensitive
					return contact.name.match(regex) || contact.email.match(regex);
				}),
				//Return all those contacts where name or email matches
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		default:
			return state;
	}
};
