/*
* site model models/site.js
*/
/*jslint         node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    siteSchema,
    specialSchema,
    Site,
    Special;


specialSchema = new Schema({
   _site       : { type : Schema.Types.ObjectId, ref: 'Site' },
   title       : { type : String, default : '', trim : true },
   description : { type : String, default : '', trim : true },
   start       : { type : Date },
   end         : { type : Date },
   startTime   : { type : Number },
   endTime     : { type : Number },
   days        : [Number], //0 is all days of the week, Sun=1
   months      : [Number] //0 is all year long
});

siteSchema = new Schema({
   name        : { type : String, default : '', trim : true },
   description : { type : String, default : '', trim : true },
   phone       : Number,
   website     : String,
   img         : String,
   loc         : [Number],
   specials    : [{type: Schema.Types.ObjectId, ref:'Special'}]
});


Special = mongoose.model('Special', specialSchema);
Site = mongoose.model('Site', siteSchema );
mongoose.connect('mongodb://localhost/sites');
module.exports = {
   Special : Special,
   Site : Site
};
