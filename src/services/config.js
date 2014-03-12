/* global define, DEBUG */

define(['request_agent', '../config', '../debug'], function(requestAgent, CFG, debug){

    'use strict';

    var baseUrl = CFG.getBaseUrl() + '/config';

    if (DEBUG) {
        debug.logService({
            name: 'Config',
            url: baseUrl
        });
    }

    function getDescriptor (moduleName) {
        var serviceUrl, promise;

        if (typeof moduleName === 'string' && !!moduleName) {
            serviceUrl = baseUrl + '/list/' + moduleName;
            promise = requestAgent.getJSON(serviceUrl);

            if (DEBUG) {
                debug.logMethod({
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
    }

    function getPlugins (containerName) {
        var serviceUrl, promise;

        if (typeof containerName === 'string' && !!containerName) {
            serviceUrl = baseUrl + '/plugins/' + containerName;
            promise = requestAgent.getJSON(serviceUrl);

            if (DEBUG) {
                debug.logMethod({
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
    }

    return {
        getDescriptor: getDescriptor,
        getPlugins: getPlugins
    };

});
