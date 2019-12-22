var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./DB');
	
var app = express();

app.use(bodyParser.json());
app.use(cors());

var businessRoute = require('./routes/business.route');
mongoose.Promise = global.Promise;
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => {console.log('Database is connected') },
	err => { console.log('Cannot connect to the database'+ err)}
  );

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
	res.render('index');
});


app.use('/business', businessRoute);


app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});











