/*
  jslint         browser : true, continue : true,
  devel  : true, indent  : 3,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $ */
/*
* Module models.fakedata.js
*/

var specials
	, test;

specials = {title:"Durango Specials", subHeading:"Where can I get a drink around here",
 	specials:[{
		name: "Cyprus Café",
		description: "Farm to table mediterranean cuisine",
		special:"All appitizers 1/2 off",
		phone : "970-385-6884",
		website: "http://www.cypruscafe.com",
		img: "cyprus_thumb.jpg"
	},
	{
		name: "Palace Restaurant",
		description: "Casual fine Dining in Durango, Colorado",
		special:"Burger night on Mondays",
		phone : "(970) 247-2018",
		website: "http://palacedurango.com/",
		img: "palace_thumb.jpg"
	},
	{
		name: "East by Southwest",
		description: "Sushi, Steak, Fusion",
		special:"Happy hour 5-6:30",
		phone : "(970) 247-5533",
		website: "http://eastbysouthwest.com/",
		img: "eastbysw.jpg"
	}]};

test = {title:"Durango Specials", subHeading:"Where can I get a drink around here"};
module.exports = { specials:specials, test:test };
/*

*/

