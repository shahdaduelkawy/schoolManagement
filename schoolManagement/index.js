const path = require('path');
require('dotenv').config({ path: './config.env' });
const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middleware/errorMiddleware');
const dbConnection = require('./config/db');

//Routes
const authRoute = require('./routes/authRoute');
const SchoolRoute = require('./routes/SchoolRoute');
const classRoomRoute = require('./routes/classRoomRoute');
const StudentRoute = require('./routes/StudentRoute');


// connect db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.get('/', (req,res) => {
  res.send('App running on port 8000')
})

// Mount Routes
app.use('/School', SchoolRoute);
app.use('/auth', authRoute);
app.use('/classRoom', classRoomRoute);
app.use('/Student', StudentRoute);


// Move the wildcard route to the end
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});