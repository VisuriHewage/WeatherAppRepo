const whitelist = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000',
    'https://weatherapprepo-74z5.onrender.com',
    'https://weatherappfrontend-ulez.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;