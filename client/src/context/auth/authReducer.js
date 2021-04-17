import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	CLEAR_ERRORS,
	LOGOUT,
	AUTH_ERROR,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			//Save the generated token in local storage
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			//Save the generated token in local storage
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};

		// case LOGIN_FAIL:
		// 	localStorage.removeItem('token');
		// 	return {
		// 		...state,
		// 		token: null,
		// 		isAuthenticated: false,
		// 		loading: false,
		// 		user: null,
		// 		error: action.payload,
		// 	};
		// case LOGOUT:
		// 	localStorage.removeItem('token');
		// 	return {
		// 		...state,
		// 		token: null,
		// 		isAuthenticated: false,
		// 		loading: false,
		// 		user: null,
		// 		error: action.payload,
		// 	};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};

		// case AUTH_ERROR:
		// 	localStorage.removeItem('token');
		// 	return {
		// 		...state,
		// 		token: null,
		// 		isAuthenticated: false,
		// 		loading: false,
		// 		user: null,
		// 		error: action.payload,
		// 	};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
