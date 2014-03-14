/* global define */

define(['request_agent', '../config'], function(requestAgent, CFG){

    'use strict';

    var module = function (utils) {
        this.utils = utils;
        this.baseUrl = utils.getBaseUrl() + '/content/asset';

        if (DEBUG) {
            this.utils.logService({
                name: 'Asset',
                url: this.baseUrl
            });
        }
    };

    module.prototype.getContent = function getContent (itemId) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        if (typeof itemId !== 'string' || !itemId) {
            throw new Error('Incorrect value for itemId');

        } else if (typeof siteName !== 'string') {
            throw new Error('Incorrect value for site name');

        } else if (!siteName) {
            throw new Error('Site name has not been set');

        } else {
            serviceUrl = this.baseUrl + '/get_content/' + siteName + '?item_id=' + itemId;
            promise = requestAgent.getJSON(serviceUrl);

            if (DEBUG) {
                this.utils.logMethod({
                    name: 'Asset.getContent',
                    params: arguments,
                    url: serviceUrl,
                    promise: promise
                });
            }

            return promise;
        }
    };

    return module;

});
