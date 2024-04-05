// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 3500;

// app.get('/',(req,res)=>{
//     res.send('hello world');
// });

// app.listen(PORT, () => console.log(`Server is up and listening - port ${PORT}`));

// const express = require('express');
// const app = express();
// const path = require('path');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions')
// const PORT = process.env.PORT || 3500;
// const {logger} = require('./middleController/logPrint');
// const errorHandler = require('./middleController/errorHandler');

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleController/logPrint');
const errorHandler = require('./middleController/errorHandler');
const verifyJWT = require('./middleController/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleController/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const Weather = require('./Data/Test');
const PORT = process.env.PORT || 3500;


connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

//test
app.use(express.urlencoded({ extended: false}));


app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/store')));
//app.use('/subdir', express.static(path.join(__dirname, '/store')));

// routes

app.use('/', require('./Routers/root'));
app.use('/register', require('./Routers/register'));
app.use('/auth', require('./Routers/authenticate'));
app.use('/refresh', require('./Routers/refresh'));
app.use('/logout', require('./Routers/logout'));


app.use(verifyJWT);
app.use('/weather', require('./Routers/api/Weather'));

//app.use('subdir',require('./Routers/subdir'));
//app.use('/', require('./Routers/root'));
app.use('/employees', require('./Routers/api/employees'));




app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler);

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.once('open', () => {
    console.log('Connected to MnogoDB');
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
});