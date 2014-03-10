/* global define */

define(function(){

    'use strict';

    function find (y) {
        console.log('Find called with y: ', y);
    }

    return {
        find: find
    };

});
