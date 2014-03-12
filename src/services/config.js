/* global define, DEBUG */

define(['request_agent'], function(requestAgent){

    'use strict';

    var module = function (utils) {
        this.utils = utils;
        this.baseUrl = utils.getBaseUrl() + '/config';

        if (DEBUG) {
            this.utils.logService({
                name: 'Config',
                url: this.baseUrl
            });
        }
    };

    module.prototype.getDescriptor = function getDescriptor (moduleName) {
        var serviceUrl, promise;

        if (typeof moduleName === 'string' && !!moduleName) {
            serviceUrl = this.baseUrl + '/list/' + moduleName;
            promise = requestAgent.getJSON(serviceUrl);

            if (DEBUG) {
                this.utils.logMethod({
                    name: 'Config.getDescriptor',
                    params: arguments,
                    url: serviceUrl,
                    promise: promise
                });
            }

            return promise;

        } else {
            throw new Error('Incorrect value for module name');
        }
    };

    module.prototype.getPlugins = function getPlugins (containerName) {
        var serviceUrl, promise;

        if (typeof containerName === 'string' && !!containerName) {
            serviceUrl = this.baseUrl + '/plugins/' + containerName;
            promise = requestAgent.getJSON(serviceUrl);

            if (DEBUG) {
                this.utils.logMethod({
                    name: 'Config.getPlugins',
                    params: arguments,
                    url: serviceUrl,
                    promise: promise
                });
            }

            return promise;

        } else {
            throw new Error('Incorrect value for container name');
        }
    };

    return module;

});
