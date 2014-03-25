/* global define, DEBUG */

define(['request_agent', '../validation'], function(requestAgent, validation) {

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
            params,
            assetProperties,
            serviceUrl,
            promise;

        assetProperties = [{
            id: 'parent_id',
            name: 'property: parent_id',
            type: 'string',
            required: true
        }, {
            id: 'file_name',
            name: 'property: file_name',
            type: 'string',
            required: true
        }, {
            id: 'file',
            name: 'property: file',
            type: 'file',
            required: true
        }, {
            id: 'mime_type',
            name: 'property: mime_type',
            type: 'string',
            required: true
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'asset',
            value: asset,
            type: 'object',
            required: true,
            properties: assetProperties
        }];

        validation.validateParams(params);

        assetProperties.forEach( function(propertyObj) {

            var propId = propertyObj.id;

            if (propertyObj.type === 'file') {
                formData.append(propId, asset[propId], asset[propId].name);
            } else {
                formData.append(propId, asset[propId]);
            }
        });

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
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the asset for which contents are being retrieved
     * @return contents of the asset (content type varies)
     */
    module.prototype.getContent = function getContent (itemId) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        validation.validateParams([{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'itemId',
            value: itemId,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/get_content/' + siteName + '?item_id=' + itemId;
        promise = requestAgent.ajax(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.getContent',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the asset to delete
     */
    module.prototype.delete = function deleteFn (itemId) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        validation.validateParams([{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'itemId',
            value: itemId,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/delete/' + siteName + '?item_id=' + itemId;
        promise = requestAgent.post(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.delete',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param queryObj object with the query information
     * @return TO-DO
     */
    module.prototype.find = function find (queryObj) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        validation.validateParams([{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'query object',
            value: queryObj,
            type: 'object',
            required: true
        }]);

        serviceUrl = this.baseUrl + '/find/' + siteName + '?' + requestAgent.param(queryObj);
        promise = requestAgent.get(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.find',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the asset to read
     * @return assetMetadata metadata of an asset
     */
    module.prototype.read = function read (itemId) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        validation.validateParams([{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'itemId',
            value: itemId,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/read/' + siteName + '?item_id=' + itemId;
        promise = requestAgent.getJSON(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.read',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the asset to read
     * @return TO-DO
     */
    module.prototype.readText = function readText (itemId) {
        var siteName = this.utils.getSite(),
            serviceUrl,
            promise;

        validation.validateParams([{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'itemId',
            value: itemId,
            type: 'string',
            required: true,
            empty: false
        }]);

        serviceUrl = this.baseUrl + '/read_text/' + siteName + '?item_id=' + itemId;
        promise = requestAgent.get(serviceUrl);

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.readText',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param asset object with all the necessary asset properties
     */
    module.prototype.update = function update (asset) {
        var siteName = this.utils.getSite(),
            formData = new FormData(),
            params,
            assetProperties,
            serviceUrl,
            promise;

        assetProperties = [{
            id: 'item_id',
            name: 'property: item_id',
            type: 'string',
            required: true
        }, {
            id: 'file',
            name: 'property: file',
            type: 'file',
            required: true
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'asset',
            value: asset,
            type: 'object',
            required: true,
            properties: assetProperties
        }];

        validation.validateParams(params);

        assetProperties.forEach( function(propertyObj) {

            var propId = propertyObj.id;

            if (propertyObj.type === 'file') {
                formData.append(propId, asset[propId], asset[propId].name);
            } else {
                formData.append(propId, asset[propId]);
            }
        });

        serviceUrl = this.baseUrl + '/update/' + siteName;
        promise = requestAgent.ajax({
            contentType: false,
            data: formData,
            processData: false,
            type: 'POST',
            url: serviceUrl
        });

        if (DEBUG) {
            this.utils.logMethod({
                name: 'Asset.update',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    return module;

});
