import AlertContext from './alertContext';
import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	//SET ALERT

	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuidv4(); //Need an id since it is an array of alerts
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		});

		//After 5000 seconds, call remove alert
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
