/* global define, DEBUG */

define(['request_agent', '../validation'], function(requestAgent, validation){

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

        validation.validateParams([{
            name: 'module name',
            value: moduleName,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/list/' + moduleName;
        promise = requestAgent.getJSON(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Config.getDescriptor',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    module.prototype.getPlugins = function getPlugins (containerName) {
        var serviceUrl, promise;

        validation.validateParams([{
            name: 'container name',
            value: containerName,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/plugins/' + containerName;
        promise = requestAgent.getJSON(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Config.getPlugins',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    return module;

});
