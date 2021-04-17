import authContext from './authContext';
import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
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

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'), //Vanilla JS to access local storage to search fpr token
		isAuthenticated: null,
		user: null,
		loading: true, //Different from GitHub Finder
		error: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//Load User
	const loadUser = async () => {
		setAuthToken(localStorage.token);
		try {
			const res = await axios.get('/api/auth');

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};

	//Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);
			//send form data to this url
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data, //Returns the token- see routes/users.js
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg, //Returns json msg from routes/users
			});
		}
	};

	// Login User

	// Logout

	//Clear Errors
	const clearErrors = () =>
		dispatch({
			type: CLEAR_ERRORS,
		});

	return (
		<authContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				register,
				clearErrors,
				loadUser,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
