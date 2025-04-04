const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');
const homePageRoutes = require('./routes/homePageRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const competeRoutes = require('./routes/competeRoutes');
const passport = require('passport');
const trainRoutes = require('./routes/trainRoutes');
const cookieParser = require('cookie-parser');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 1000;

connectDB();

// Middleware

/*
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
*/

app.use(cors({
  origin: 'https://lucky-cali.com',
  credentials: true
}));


/*
app.use(cors({
  origin: '*',  
  credentials: true
}));
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/homepage', homePageRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/train', trainRoutes);
app.use('/compete', competeRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
