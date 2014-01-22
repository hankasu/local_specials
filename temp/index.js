/*
  jslint         browser : true, continue : true,
  devel  : true, indent  : 3,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $ */
/*
* module routes/index.js	
*/
var mongoose = require('mongoose')
    , Site = mongoose.model('Site')
    , Special = mongoose.model('Special');

exports.index = function(req, res){
   Site.find(function(err, sites){
      if(err){console.log(err);}
      //console.log(sites);
      res.render('index', {
         title:"Durango Specials",
         subHeading:"Where can I get a drink around here?",
         docs:sites
      });
   });

};

exports.add = function (req, res) {
	res.render('add', {title:"Durango Specials", subHeading:"Add a new site"});
};

exports.create = function(req, res){
	//TODO need a validation middleware
	var formData = req.body
	  , loc = [formData.lon, formData.lat]
	  , site = {};
	for(key in formData){
		if(key !== "lon" && key !== "lat"){
			site[key] = formData[key];
		}
	}
	site.loc = loc;
	Site.create(site, function(err, obj){
		if(err){
		 console.log(err);
		 res.send("Error creating site");
		}
		else{
			console.log(obj);
			res.redirect('/');
		}
	});
};

exports.delete = function(req, res){
	var id = req.params.id
	  , msg;
	Site.findByIdAndRemove(id, function(err, results){
		if(err){
			msg = "Error deleting site " + id + "\n" + err; 
			console.log(msg);
			res.send(msg); 
		}
		else {
		  msg = "Deleted doc " + id + " " + results;
        console.log(msg);
        res.send(msg);
		}

	});

};

