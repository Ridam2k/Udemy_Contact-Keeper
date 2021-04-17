import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	CLEAR_CONTACTS,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts], //Adds the received contact to the the existing contacts
				loading: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loading: false,
				//Assign all contacts whose id is not the one passed to the state 'contacts' =>deleting the passed contact
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null,
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
				loading: false,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
				loading: false,
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id ? action.payload : contact
				),
				loading: false,
				//Find the contact with the matching id : return the payload info for that particular contact
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi'); //global and case insensitive
					return contact.name.match(regex) || contact.email.match(regex);
				}),
				loading: false,
				//Return all those contacts where name or email matches
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
				loading: false,
			};

		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
