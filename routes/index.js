
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
	res.render('helloworld', { title: 'Hello, World!' });
};

exports.userlist = function(db) {
	return function(req, res) {
		var collection = db.get('usercollection');
		collection.find({},{},function(e,docs){
			res.render('userlist', {
					"userlist" : docs
			});
		});
	};
};

exports.newuser = function(req, res){
	res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function(db) {
		return function(req, res) {

				// Get our form values. These rely on the "name" attributes
				var userName = req.body.username;
				var userEmail = req.body.useremail;

				// Set our collection
				var collection = db.get('usercollection');

				// Submit to the DB
				collection.insert({
						"username" : userName,
						"email" : userEmail
				}, function (err, doc) {
						if (err) {
								// If it failed, return error
								res.send("There was a problem adding the information to the database.");
						}
						else {
								// If it worked, set the header so the address bar doesn't still say /adduser
								res.location("userlist");
								// And forward to success page
								res.redirect("userlist");
						}
				});

		}
}

exports.arrivallist = function(db) {
	return function(req, res) {
		var collection = db.get('arrivalcollection');
		collection.find({username : currentUser}, {},
			function(e,docs){
					res.render('arrivallist', {
							"arrivallist" : docs[0].arrivals
					});
					console.log(docs);
					console.log("docs.arrivals = " + docs[0].arrivals);
			});
	};
};

exports.newarrival = function(req, res){
	res.render('newarrival', { title: 'Add New arrival' });
};

exports.addarrival = function(db) {
		return function(req, res) {

				// Get our form values. These rely on the "name" attributes
				var arrivalDate = req.body.arrivaltime;

				// Set our collection
				var collection = db.get('arrivalcollection');

				var arrivalInsertFilter = {username : currentUser};

				var arrivalInsert = {$addToSet : {"arrivals" : arrivalDate} }; 

				// Submit to the DB
				collection.update(arrivalInsertFilter, arrivalInsert, function (err, doc) {
						if (err) {
								// If it failed, return error
								res.send("There was a problem adding the information to the database.");
						}
						else {
								// If it worked, set the header so the address bar doesn't still say /addarrival
								res.location("arrivallist");
								// And forward to success page
								res.redirect("arrivallist");
						}
				});

		}
}

//TODO: assign to logged in user
var currentUser = "alex";

