import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return [...state, action.payload];
		//State is just an array so directly return that by adding the required alert
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== action.payload); //the payload is just an id

		default:
			return state;
	}
};
