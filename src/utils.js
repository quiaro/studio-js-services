/* global define */

define(['config'], function(CFG) {

    'use strict';

    var API = {};

    function setSite(siteName) {

        if (typeof siteName === 'string' && !!siteName) {
            CFG.services.site = siteName;
            return CFG.services.site;
        } else {
            throw new Error('Incorrect value for site name');
        }
    }

    function getSite() {
        return CFG.services.site;
    }

    function getBaseUrl() {
        var path;

        if (CFG.services.domain) {
            path = [CFG.services.protocol, '://',
                    CFG.services.domain, ':', CFG.services.port,
                    '/', CFG.api.base, '/', CFG.api.version].join("");
        } else {
            path = ['/', CFG.api.base, '/', CFG.api.version].join("");
        }
        return path;
    }

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

    API.getSite = getSite;
    API.getBaseUrl = getBaseUrl;
    API.setSite = setSite;

    if (DEBUG) {
        // Expose debug methods
        API.logMethod = logMethod;
        API.logService = logService;
    }

    return API;
});

