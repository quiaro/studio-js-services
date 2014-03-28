/* global define, DEBUG */

define(['request_agent', '../validation'], function(requestAgent, validation) {

    'use strict';

    var module = function (utils) {
        this.name = 'Descriptor';
        this.utils = utils;
        this.baseUrl = utils.getBaseUrl() + '/descriptor';

        if (DEBUG) {
            this.utils.logService({
                name: this.name,
                url: this.baseUrl
            });
        }
    };

    /*
     * @param descriptor object with all the necessary descriptor properties
     */
    module.prototype.create = function create (descriptor) {
        var siteName = this.utils.getSite(),
            formData,
            params,
            descriptorProperties,
            serviceUrl = this.baseUrl + '/create/' + siteName,
            promise;

        descriptorProperties = [{
            id: 'content_type_id',
            name: 'property: content_type_id',
            type: 'string',
            required: true
        }, {
            id: 'parent_id',
            name: 'property: parent_id',
            type: 'string',
            required: true
        }, {
            id: 'file_name',
            name: 'property: file_name',
            type: 'string',
            required: true,
            empty: false
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'descriptor',
            value: descriptor,
            type: 'object',
            required: true,
            properties: descriptorProperties
        }];

        if (descriptor.file) {
            // Create new descriptor from file
            descriptorProperties.push({
                id: 'file',
                name: 'property: file',
                type: 'file',
                required: true
            });

            validation.validateParams(params);

            formData = new FormData();

            descriptorProperties.forEach( function(propertyObj) {

                var propId = propertyObj.id;

                if (propertyObj.type === 'file') {
                    formData.append(propId, descriptor[propId], descriptor[propId].name);
                } else {
                    formData.append(propId, descriptor[propId]);
                }
            });

            promise = requestAgent.ajax({
                contentType: false,
                data: formData,
                processData: false,
                type: 'POST',
                url: serviceUrl
            });

        } else {
            // Create new descriptor from inline content
            descriptorProperties.push({
                id: 'content',
                name: 'property: content',
                type: 'string',
                required: true,
                empty: false
            });

            validation.validateParams(params);

            promise = requestAgent.post(serviceUrl, descriptor);
        }

        if (DEBUG) {
            this.utils.logMethod({
                name: this.name + '.create',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the descriptor to delete
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

        serviceUrl = this.baseUrl + '/delete/' + siteName;
        promise = requestAgent.post(serviceUrl, { item_id: itemId });

        if (DEBUG) {
            this.utils.logMethod({
                name: this.name + '.delete',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param obj object with all the necessary descriptor properties
     */
    module.prototype.duplicate = function duplicate (obj) {
        var siteName = this.utils.getSite(),
            params,
            objProperties,
            serviceUrl,
            promise;

        objProperties = [{
            id: 'item_id',
            name: 'property: item_id',
            type: 'string',
            required: true,
            empty: false
        }, {
            id: 'parent_id',
            name: 'property: parent_id',
            type: 'string',
            required: true
        }, {
            id: 'file_name',
            name: 'property: file_name',
            type: 'string',
            required: true,
            empty: false
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'obj',
            value: obj,
            type: 'object',
            required: true,
            properties: objProperties
        }];

        validation.validateParams(params);

        serviceUrl = this.baseUrl + '/duplicate/' + siteName;
        promise = requestAgent.post(serviceUrl, obj);

        if (DEBUG) {
            this.utils.logMethod({
                name: this.name + '.duplicate',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param obj object with all the necessary descriptor properties
     */
    module.prototype.move = function move (obj) {
        var siteName = this.utils.getSite(),
            params,
            objProperties,
            serviceUrl,
            promise;

        objProperties = [{
            id: 'item_id',
            name: 'property: item_id',
            type: 'string',
            required: true,
            empty: false
        }, {
            id: 'parent_id',
            name: 'property: parent_id',
            type: 'string',
            required: true
        }, {
            id: 'file_name',
            name: 'property: file_name',
            type: 'string',
            required: true,
            empty: false
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'obj',
            value: obj,
            type: 'object',
            required: true,
            properties: objProperties
        }];

        validation.validateParams(params);

        serviceUrl = this.baseUrl + '/move/' + siteName;
        promise = requestAgent.post(serviceUrl, obj);

        if (DEBUG) {
            this.utils.logMethod({
                name: this.name + '.move',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the descriptor to read
     * @return descriptorMetadata metadata of an descriptor
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
                name: this.name + '.read',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the descriptor to read
     * @return Text value of the descriptor
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
                name: this.name + '.readText',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param descriptor object with all the necessary descriptor properties
     */
    module.prototype.update = function update (descriptor) {
        var siteName = this.utils.getSite(),
            formData,
            params,
            descriptorProperties,
            serviceUrl = this.baseUrl + '/update/' + siteName,
            promise;

        descriptorProperties = [{
            id: 'item_id',
            name: 'property: item_id',
            type: 'string',
            required: true,
            empty: false
        }];

        params = [{
            name: 'site name',
            value: siteName,
            type: 'string',
            required: true,
            empty: false
        }, {
            name: 'descriptor',
            value: descriptor,
            type: 'object',
            required: true,
            properties: descriptorProperties
        }];

        if (descriptor.file) {
            // Update new descriptor from file
            descriptorProperties.push({
                id: 'file',
                name: 'property: file',
                type: 'file',
                required: true
            });

            validation.validateParams(params);

            formData = new FormData();

            descriptorProperties.forEach( function(propertyObj) {

                var propId = propertyObj.id;

                if (propertyObj.type === 'file') {
                    formData.append(propId, descriptor[propId], descriptor[propId].name);
                } else {
                    formData.append(propId, descriptor[propId]);
                }
            });

            promise = requestAgent.ajax({
                contentType: false,
                data: formData,
                processData: false,
                type: 'POST',
                url: serviceUrl
            });

        } else {
            // Update new descriptor from inline content
            descriptorProperties.push({
                id: 'content',
                name: 'property: content',
                type: 'string',
                required: true,
                empty: false
            });

            validation.validateParams(params);

            promise = requestAgent.post(serviceUrl, descriptor);
        }

        if (DEBUG) {
            this.utils.logMethod({
                name: this.name + '.update',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    return module;

});
