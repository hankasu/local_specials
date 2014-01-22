/**
 * Created by henry on 12/22/13.
 */
/*
 * routes.js - module to provide routing
 */

/*jslint         node    : true, continue : true,
 devel  : true, indent  : 3,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes,
    models = require('./models/site'),
    days   = ['Sunday', 'Monday', 'Tuesday',
              'Wednesday', 'Thursday', 'Friday',
              'Saturday', 'Sunday'],
    months = ['January', 'February', 'March',
              'April', 'May', 'June', 'July',
               'August', 'September', 'October',
               'November', 'December'];

// ------------- END MODULE SCOPE VARIABLES ---------------

//---------------BEGIN MODULE SCOPE METHODS----------------
//need to make this asynchronous
function getNumberArray(strValues){
   var numbers = [],
       i;

   if(Array.isArray(strValues)){
      for(i=0; i < strValues.length; i++){
         numbers.push(parseInt(strValues[i]));
      }
   }
   //just a single value
   else{
      numbers = [strValues];
   }
   return numbers;
}

//need to make this async
//value will be in hh:mm 24 hour
function parseTime(timeValue){
   var dateObj = new Date(2000,0,0),
       timeParts = timeValue.split(/\s|,|:/g);

   dateObj.setHours(parseInt(timeParts[0]));
   dateObj.setMinutes(parseInt(timeParts[1]));
   dateObj.setSeconds(0);
   return dateObj;

}
//----------------END MODULE SCOPE METHODS----------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function (app, server) {
   app.get('/', function (req, res) {
      models.Site.find(function (err, sites) {
         if (err) {
            console.log(err);
         }
         //console.log(sites);
         res.render('index', {
            title: 'Durango Specials',
            subHeading: 'Where can I get a drink around here?',
            sites: sites
         });
      });
   });

//   app.all( '/site/*?', function ( req, res, next ) {
//      res.contentType( 'json' );
//      next();
//   });
/*   app.all('/', function(req, res, next){
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next();
   });*/

   app.get('/site/list', function (req, res) {
      res.send({ title: req.params.obj_type + ' list' });
   });

   app.get('/site/details/:id',
       function(req, res){
          var id = req.params.id;
          models.Site.findById(id, function(err, site){
             if(err){
                console.log(err);
             }
             else{
                res.render('details', {
                   title:'Durango Specials',
                   subHeading:'Information for ' + site.name,
                   site:site
                });
             }
          });
   });

   app.get('/site/create', function (req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.render('create', {
         title: 'Durango Specials',
         subHeading: 'Create a new site.'
      });
   });
   app.post('/site/create', function (req, res) {
      var formData = req.body,
          loc = [formData.lon, formData.lat],
          site = {},
          key;
      for (key in formData) {
         if (key !== 'lon' && key !== 'lat') {
            site[key] = formData[key];
         }
      }
      site.loc = loc;
      models.Site.create(site, function (err, obj) {
         if (err) {
            console.log(err);
            res.send('Error creating site');
         }
         else {
            console.log(obj);
            res.redirect('/');
         }
      });
   });

   app.get('/site/edit/:id',
      function (req, res) {
         var id = req.params.id;
         models.Site.findById(id, function(err, result){
            if(err){
               console.log(err);
            }
            else{
               //console.log(result);
               res.render('edit',{
                  title: 'Durango Specials',
                  subHeading: 'Edit info for ' + result.name,
                  site: result
               });
            }

         });
      }
   );

   app.post('/site/edit/:id',
      function (req, res) {
         var id = req.params.id,
             formData = req.body,
             loc = [formData.lon, formData.lat],
             site = {},
             key;
         for (key in formData) {
            if (key !== 'lon' && key !== 'lat') {
               site[key] = formData[key];
            }
         }
         site.loc = loc;
         models.Site.findByIdAndUpdate(id, site,
             function(err, obj){
               if(err){
                  console.log(err);
               }
               else{
                  console.log('Updated ' + id);
                  res.redirect('/');
               }
             });
      }
   );

   app.delete('/site/delete/:id',
      function (req, res) {
         var id = req.params.id
             , msg;
         models.Site.findByIdAndRemove(id, function (err, results) {
            if (err) {
               msg = 'Error deleting site ' + id + '\n' + err;
               console.log(msg);
               res.send(msg);
            }
            else {
               msg = 'Deleted doc ' + id;
               console.log(msg);
               res.send(msg);
            }

         });
   });

   app.get('/special/create/:siteId',
       function(req, res){
          var siteId = req.params.siteId;
          models.Site.findById(siteId,function(err, site){
             if(err){
                console.log(err);
             }
             else{
                //create the context object
                res.render('special_create',{
                   title:'Durango Specials',
                   subHeading:'Add special to ' + site.name,
                   site:site
                });
             }
         });
   });

   app.get('/specials', function(req, res){
      var list = [];
      models.Special.find()
          .populate('_site', 'name')
          .exec(function(err, specials){
             if(err){
                console.log(err);
             }
             else{
                res.render('specials', {
                   title:'Durango Specials',
                   subHeading:'Specials near you',
                   specials:specials
                } );
             }
          });
   });
   app.post('/special/create',
       function(req, res){
          var reqData = req.body,
             special = {};
          
          special['_site']       = reqData['id'];
          special['title']       = reqData['title'];
          special['description'] = reqData['description'];
          special['start']       = new Date(reqData['start']);
          special['end']         = new Date(reqData['end']);
          special['days']        = getNumberArray(reqData['days']);
          special['months']      = getNumberArray(reqData['months']);
          
          //update the related site
          models.Special.create(special,
             function(err, specialObj){
                if(err){
                   console.log(err);
                }
                else {
                   //update the site
                   models.Site.findOneAndUpdate(
                       {'_id' : specialObj._site },
                       { $push : { 'specials' : specialObj.id} },
                        function(err, site){
                           if(err){
                              console.log(err);
                           }
                           else{
                              console.log('Special created');
                              res.redirect('/');
                           }
                        });
                }
             });

       });
};
module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------