var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));

var mysql = require('./dbcon.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9477);
//app.set('port', 9501);

app.use(session({secret:'supersecret',
				resave: true,
				saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/**************INDEX PAGE******************/
app.get('/', function(req,res,next){
	res.render('home');
});

/**************SIGNUP PAGE******************/
app.get('/signup', function(req,res,next){
	res.render('signup');
});

/**************LANDING PAGE******************/
app.get('/landing', function(req,res,next){
	if (req.session.name){
		res.render('landing'); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/**************AUTHENTICATE USER/PASS******************/
app.post('/authenticate',function(req,res,next){
  var pass = req.body.password;

  mysql.pool.query('SELECT user_nm, password, user_id FROM users WHERE user_nm = ?', [req.body.user_nm], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

  var authPass = rows;

  if (authPass[0] !== undefined){
	  if(pass === authPass[0].password){
		req.session.name = authPass[0].user_nm;
		req.session.userID = authPass[0].user_id;
		req.session.save();
	    res.status(200).send();
	  } 
	  else{
	  	res.status(445).send();
	  } 	
  }
  else{
    res.status(445).send();
  }
  });

});

/**************CREATE NEW USER******************/
app.post('/add_user', function(req,res,next){
	mysql.pool.query("INSERT INTO users (`user_nm`,`password`,`user_email`) VALUES (?,?,?)",
	[req.body.user_nm, req.body.password, req.body.user_email],
	function(err, result){
		if(err){
			next(err);
			return;
		}
	});

	res.send();
});

/***********YOUR PREFERENCES PAGE**********/
app.get('/preferences', function(req,res,next){
	if (req.session.userID){
		var context = {};
		context.userID = req.session.userID;
		res.render('preferences', context); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/***********ADD PREFERENCES****************/
// We must make a table called preferences in our db with the below bool fields and a userID field.
app.post('/add_preferences', function(req,res,next) {
	mysql.pool.query("UPDATE users SET hikes=?, tpark=?, museum=?, mall=?, npark=?, sports=?, wpark=?, landmark=?, musicEvent=? WHERE user_id=?",
	[req.body.NatureHikes, req.body.ThemeParks, req.body.Museum, req.body.ShoppingMalls, req.body.NatureParks, req.body.SportingEvents, req.body.WaterPark, req.body.FamousLandmarks, req.body.MusicEvents, req.body.userID],
	function(err, result) {
		if(err) {
			next(err);
			return;
		}
	});
	res.send();
});

/***********BILLING INFO PAGE**********/
app.get('/billing_info', function(req,res,next){
	if (req.session.userID){
		var context = {};
		context.userID = req.session.userID;
		res.render('billing-info', context); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/***********BILLING INFO PAGE**********/
app.post('/add_billing', function(req, res, next){
	mysql.pool.query("INSERT INTO `billing_info` (user_id, first_name, last_name, phone_number, credit_card_name, credit_card_number, csc_number, exp_mon, exp_yr, card_type) VALUES (?,?,?,?,?,?,?,?,?,?)",
		[req.body.userId, req.body.first_name, req.body.last_name, req.body.phone_no, req.body.card_name, req.body.card_no, req.body.csc_no, req.body.exp_mon, req.body.exp_yr, req.body.card_type],
		function(err, result){
			if(err){
				next(err);
				return;
			}
		});

		res.send();
});

/***********MAKE AND MODEL**********/
app.get('/model_and_make', function(req,res,next){
	if (req.session.userID){
		var context = {};
		context.userID = req.session.userID;
		res.render('model_and_make', context); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/***********GAS STATION PAGE**********/
app.get('/gasstation', function(req,res,next){
	if (req.session.userID){
		var context = {};
		context.userID = req.session.userID;
		res.render('gasstation', context); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/***********ADD MAKE AND MODEL****************/
// We must make a table called preferences in our db with the below bool fields and a userID field.
app.post('/add_make_model', function(req,res,next) {
	mysql.pool.query("UPDATE users SET make=?, model=? WHERE user_id=?",
	[req.body.make, req.body.model, req.body.userId],
	function(err, result) {
		if(err) {
			next(err);
			return;
		}
	});
	res.send();
});

/************ADD GAS PREFERENCES***********/
app.post('/add_gasstation', function(req,res,next) { // Need to set up the DB with the following fields first
	mysql.pool.query("UPDATE users SET chevron=?, circlek=?, citgo=?, costco=?, cumberland=?, exxon=?, frontier=?, kum=?, mobil=?, race=?, shell=?, sams=?, speedway=?, sunoco=?, wawa=?, seven=?, methanol=?, gasoline=?, diesel=?, hydrogen=?, charge=?, biodiesel=? WHERE user_id=?",
		[req.body.BP, req.body.Chevron, req.body.Citgo, req.body.Costco, req.body.Cumberland, req.body.Exxon, req.body.Frontier, req.body.Kum, req.body.Mobil, req.body.Race, req.body.Shell, req.body.Sams, req.body.Speedway, req.body.Sunoco, req.body.Wawa, req.body.Seven, req.body.Methanol, req.body.Gasoline, req.body.Diesel, req.body.Hydrogen, req.body.Charge, req.body.Biodiesel, req.body.userId],
	function(err, result) {
		if(err) {
			next(err);
			return;
		}
	});
	res.send();
});

/************RUN THE APP******************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

