/* global define, DEBUG */

define(['request_agent', '../config'], function(RA, CFG){

    'use strict';

    if (DEBUG) {
        console.log('Debugging config service ...');
    }

    function getDescriptor (moduleName) {
        var defer = RA.Deferred();

        return defer.promise();
    }

    return {
        getDescriptor: getDescriptor
    };

});
