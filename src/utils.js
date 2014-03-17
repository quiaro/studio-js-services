/* global define, DEBUG */

define(['request_agent', 'config'], function(requestAgent, CFG) {

    'use strict';

    var module = function (customConfig) {
        this.config = requestAgent.extend(true, {}, CFG, customConfig);

        if (DEBUG) {
            console.log('Studio Services configuration: ', this.config);
        }
    };

    /*
     * @param overrideObj Object with properties to momentarily override
              the default (this.config.services)
     * @return base url to use with additional specific url service info
     */

    // TO-DO: Check cyclomatic complexity of this function so the js hint comment
    //        can be removed
    /*jshint -W074 */
    module.prototype.getBaseUrl = function getBaseUrl(overrideObj) {

        var path = [],
            override = overrideObj || {},
            location, protocol, domain, port;

        // Better not assume that the window object exists
        location = window && window.location || {};

        protocol = override.protocol || this.config.services.protocol || location.protocol;

        domain = override.domain || this.config.services.domain || location.hostname;

        port = (override.port) ? override.port :
                    (typeof this.config.services.port === 'undefined' ||
                     typeof this.config.services.port === 'string' &&
                        !isNaN(+this.config.services.port)) ? this.config.services.port :
                            location.port;

        if (protocol && domain) {
            path.push(protocol);
            path.push('//');
            path.push(domain);

            if (port) {
                path.push(':');
                path.push(port);
            }
        }
        path.push('/');
        path.push(this.config.api.base);
        path.push('/');
        path.push(this.config.api.version);

        return path.join('');
    };
    /*jshint +W074 */

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
                    console.log('--------------------------------');
                    console.log('*** Request from ' + method.name);
                    console.log('*** URL: ' + method.url);
                    console.log('*** RESOLVED: ', result);
                });
                method.promise.fail(function(reason){
                    console.log('--------------------------------');
                    console.log('*** Request from ' + method.name);
                    console.log('*** URL: ' + method.url);
                    console.error('*** FAILED: ', reason);
                });
            } else {
                console.log('*** No promise for: ' + method.name);
            }
        };
    }

    return module;

});

