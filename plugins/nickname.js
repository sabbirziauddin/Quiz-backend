const bodyParser = require('body-parser');

module.exports = {
    registerRoutes: function (app) {
        app.use(bodyParser.json());
        // Handle nickname request
        app.post('/nickname', function (req, res) {

            const { nickname } = req.body;

            // TODO: Add code to update nickname in database

            console.log('Nickname updated:', nickname);
            res.send('Nickname updated');
        });
    }
};
