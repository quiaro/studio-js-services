/* global define */

define(function() {

    'use strict';

    function logService(service) {
        console.log(service.name + ' | base URL: ', service.url);
    }

    /*
     * @param method : an object with the method properties (: name, arguments, url, promise)
     */
    function logMethod(method) {
        console.log('--------------------------------');
        console.log('Calling ' + method.name + ' ...');
        console.log('Params: ', method.params);

        if (method.promise) {
            method.promise.done(function(result) {
                console.log('*** Request from ' + method.name);
                console.log('*** URL: ' + method.url);
                console.log('*** RESOLVED: ', result);
            });
            method.promise.fail(function(reason){
                console.log('*** Request from ' + method.name);
                console.log('*** URL: ' + method.url);
                console.log('*** FAILED: ', reason);
            });
        } else {
            console.log('*** No promise for: ' + method.name)
        }
    }

    return {
        logMethod: logMethod,
        logService: logService
    };

});

