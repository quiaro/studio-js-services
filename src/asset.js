/* global define */

define(['request_agent'], function(RA){

    'use strict';

    function find (x) {
        var defer = RA.Deferred();
        setTimeout(function(){
            defer.resolve(20);
        }, 2000);

        console.log('Find called with x: ', x);
        return defer.promise();
    }

    return {
        find: find
    };

});
