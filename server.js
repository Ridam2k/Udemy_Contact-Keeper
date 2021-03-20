const express = require('express'); //Importing express
const connectDB = require('./config/db');

const app = express();

//Connect Databse
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.port || 5000;

app.get('/', (req, res) =>
	res.json({ msg: 'Welcome to the ContactKeeper API...' })
);

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
