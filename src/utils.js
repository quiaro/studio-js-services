/* global define, DEBUG */

define(['request_agent', 'config'], function(requestAgent, CFG) {

    'use strict';

    var module = function (customConfig) {
        this.config = requestAgent.extend(true, {}, CFG, customConfig);

        if (DEBUG) {
            console.log('Studio Services configuration: ', this.config);
        }
    };

    module.prototype.getBaseUrl = function getBaseUrl() {
        var path;

        if (this.config.services.domain) {
            path = [this.config.services.protocol, '://',
                    this.config.services.domain, ':', this.config.services.port,
                    '/', this.config.api.base, '/', this.config.api.version].join('');
        } else {
            path = ['/', this.config.api.base, '/', this.config.api.version].join('');
        }
        return path;
    };

    module.prototype.getSite = function getSite() {
        return this.config.services.site;
    };

    /*
     * @param url: base url value
     * @param path: path or url value
     * @return url value: the value returned will be that of path if it includes a protocol;
     *                    otherwise, the value of path will be appended to that of url
     *                    (a forward slash will be added between them, if necessary)
     */
    module.prototype.mergePath = function mergePath(url, path) {
        return (path.indexOf('://') !== -1) ?
                    path :
                    (path.indexOf('/') === 0) ?
                        url + path :
                        url + '/' + path;
    };

    module.prototype.setSite = function setSite(siteName) {
        if (typeof siteName === 'string' && !!siteName) {
            this.config.services.site = siteName;
            return this.config.services.site;
        } else {
            throw new Error('Incorrect value for site name');
        }
    };

    if (DEBUG) {
        module.prototype.logService = function logService(service) {
            console.log(service.name + ' | base URL: ', service.url);
        };

        /*
         * @param method : an object with the method properties (: name, arguments, url, promise)
         */
        module.prototype.logMethod = function logMethod(method) {
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
                console.log('*** No promise for: ' + method.name);
            }
        };
    }

    return module;

});

