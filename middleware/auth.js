const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token)
		return res.status(401).json({ msg: 'No token, Authorization denied' });

	//Else continue
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		//Assign the current user to the user to which the token belongs i.e. link the user to the db
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token invalid' });
	}
};
