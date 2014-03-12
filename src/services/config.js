/* global define, DEBUG */

define(['request_agent', '../config'], function(RA, CFG){

    'use strict';

    var baseUrl = CFG.getBaseUrl() + '/config';

    if (DEBUG) { console.log('Config | base URL: ', baseUrl); }

    function getDescriptor (moduleName) {
        var serviceUrl, promise;

        if (DEBUG) { console.log('Calling Config.getDescriptor with params: ', arguments); }

        if (typeof moduleName === 'string' && !!moduleName) {
            serviceUrl = baseUrl + '/list/' + moduleName;
            promise = RA.getJSON(serviceUrl);

            if (DEBUG) {
                promise.done(function(result) {
                    console.log('Request from Config.getDescriptor resolved: ', result);
                });
                promise.fail(function(reason){
                    console.error('Request from Config.getDescriptor failed: ', reason);
                });
            }

            return promise;

        } else {
            throw new Error('Incorrect value for module name');
        }
    }

    return {
        getDescriptor: getDescriptor
    };

});
