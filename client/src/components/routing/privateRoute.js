import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authcontext = useContext(AuthContext);

	const { isAuthenticated, loading } = authcontext;

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
