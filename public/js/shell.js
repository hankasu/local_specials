/*
 * module_template.js
 * Template for browser feature modules
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 * Copyright (c) 2011-2012 Manning Publications Co.
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

shell = (function () {

  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // example: onClickButton = ...
  //-------------------- END EVENT HANDLERS --------------------



  //------------------- BEGIN PUBLIC METHODS -------------------
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $container ) {
    stateMap.$container = $container;
    setJqueryMap();
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
  //--commit testing
}());