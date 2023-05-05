const mysql = require('mysql');
const config = require('../config');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

// Connect to database
connection.connect(function (error) {
    if (error) {
        console.error('Error connecting to database:', error);
    } else {
        console.log('Connected to database');
    }
});

module.exports = {
    registerRoutes: function (app) {
        app.use(bodyParser.json());
        // Handle nickname request
        app.post('/question', function (req, res) {
            // TODO: No functionality added
        }
        )
    }
};