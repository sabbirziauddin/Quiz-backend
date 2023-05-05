const mysql = require('mysql');
const config = require('../config');
const bodyParser = require('body-parser');

// Create database connection
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
    // Use body-parser middleware to parse request bodies as JSON
    app.use(bodyParser.json());

    // Handle signup request
    app.post('/signup', function (req, res) {
      const { email, password, nickname } = req.body;

      // Insert new user into database
      const query = `INSERT INTO ${config.USER_TABLE_NAME} (email, password, nickname) VALUES (?, ?, ?)`;
      connection.query(query, [email, password, nickname], function (error, results, fields) {
        if (error) {
          console.error('Error creating user:', error);
          res.status(500).send('Internal server error');
        } else {
          console.log('User created:', email);
          res.send('User created');
        }
      });
    });

    // Handle login request
    app.post('/login', function (req, res) {
      const { email, password } = req.body;

      // Query database for user
      const query = `SELECT * FROM ${config.USER_TABLE_NAME} WHERE email = ? AND password = ?`;
      connection.query(query, [email, password], function (error, results, fields) {
        if (error) {
          console.error('Error finding user:', error);
          res.status(500).send('Internal server error');
        } else if (results.length === 0) {
          console.log('User not found:', email);
          res.status(401).send('Invalid email or password');
        } else {
          console.log('User found:', email);
          res.send('Login successful');
        }
      });
    });
  }
};
