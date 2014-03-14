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

    /*
     * @param asset object with all the necessary asset properties
     */
    module.prototype.create = function create (asset) {
        var siteName = this.utils.getSite(),
            formData = new FormData(),
            fields,
            serviceUrl,
            promise;

        // Set the field value to true, if the field is required
        fields = {
            parent_id: { required: true },
            file_name: { required: true },
            file: { type: 'file',
                    required: true },
            mime_type: { required: true }
        };

        if (!requestAgent.isPlainObject(asset)) {
            throw new Error('Incorrect asset value. Expecting an object.');

        } else if (typeof siteName !== 'string') {
            throw new Error('Incorrect value for site name');

        } else if (!siteName) {
            throw new Error('Site name has not been set');

        } else {

            for (var key in asset) {

                // Only process properties that we ask for
                if (key in fields) {

                    if (fields[key].type === 'file') {
                        formData.append(key, asset[key], asset[key].name);
                    } else {
                        formData.append(key, asset[key]);
                    }

                    // Do not process the field again
                    delete fields[key];
                }
            }

            // Make sure that all required fields were processed
            for (var key in fields) {
                if (fields[key].required) {
                    throw new Error('Property \'' + fields[key] + '\' is required, but it is missing' );
                }
            }

            serviceUrl = this.baseUrl + '/create/' + siteName;
            promise = requestAgent.ajax({
                                            contentType: false,
                                            data: formData,
                                            processData: false,
                                            type: 'POST',
                                            url: serviceUrl
                                        });

            if (DEBUG) {
                this.utils.logMethod({
                    name: 'Asset.create',
                    params: arguments,
                    url: serviceUrl,
                    promise: promise
                });
            }

            return promise;
        }
    };

    /*
     * @param itemId id of the asset for which contents are being retrieved
     * @return contents of the asset (content type varies)
     */
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
            promise = requestAgent.ajax(serviceUrl);

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
