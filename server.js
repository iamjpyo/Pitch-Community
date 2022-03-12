const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

connectDB(); //Connecting Database 

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

//GET post to test API is working properly
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/pitches', require('./routes/api/pitches'));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));