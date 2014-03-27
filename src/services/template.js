/* global define, DEBUG */

define(['request_agent', '../validation'], function(requestAgent, validation) {

    'use strict';

    var module = function (utils) {
        this.utils = utils;
        this.baseUrl = utils.getBaseUrl() + '/template';

        if (DEBUG) {
            this.utils.logService({
                name: 'Template',
                url: this.baseUrl
            });
        }
    };

    /*
     * @param template object with all the necessary template properties
     */
    module.prototype.create = function create (template) {
        var siteName = this.utils.getSite(),
            formData,
            params,
            templateProperties,
            serviceUrl,
            promise;

        templateProperties = [{
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
            name: 'template',
            value: template,
            type: 'object',
            required: true,
            properties: templateProperties
        }];

        if (template.file) {
            // Create new template from file
            templateProperties.push({
                id: 'file',
                name: 'property: file',
                type: 'file',
                required: true
            });

            validation.validateParams(params);

            formData = new FormData();

            templateProperties.forEach( function(propertyObj) {

                var propId = propertyObj.id;

                if (propertyObj.type === 'file') {
                    formData.append(propId, template[propId], template[propId].name);
                } else {
                    formData.append(propId, template[propId]);
                }
            });

        } else {
            // Create new template from inline content
            templateProperties.push({
                id: 'content',
                name: 'property: content',
                type: 'string',
                required: true,
                empty: false
            });

            validation.validateParams(params);

            formData = template;
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
                name: 'Template.create',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the template to delete
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
                name: 'Template.delete',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param obj object with all the necessary template properties
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
                name: 'Template.duplicate',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param obj object with all the necessary template properties
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
                name: 'Template.move',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the template to read
     * @return templateMetadata metadata of an template
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
                name: 'Template.read',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param itemId id of the template to read
     * @return Text value of the template
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
                name: 'Template.readText',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    /*
     * @param template object with all the necessary template properties
     */
    module.prototype.update = function update (template) {
        var siteName = this.utils.getSite(),
            formData,
            params,
            templateProperties,
            serviceUrl,
            promise;

        templateProperties = [{
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
            name: 'template',
            value: template,
            type: 'object',
            required: true,
            properties: templateProperties
        }];

        if (template.file) {
            // Update new template from file
            templateProperties.push({
                id: 'file',
                name: 'property: file',
                type: 'file',
                required: true
            });

            validation.validateParams(params);

            formData = new FormData();

            templateProperties.forEach( function(propertyObj) {

                var propId = propertyObj.id;

                if (propertyObj.type === 'file') {
                    formData.append(propId, template[propId], template[propId].name);
                } else {
                    formData.append(propId, template[propId]);
                }
            });

        } else {
            // Update new template from inline content
            templateProperties.push({
                id: 'content',
                name: 'property: content',
                type: 'string',
                required: true,
                empty: false
            });

            validation.validateParams(params);

            formData = template;
        }

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
                name: 'Template.update',
                url: serviceUrl,
                promise: promise
            });
        }

        return promise;
    };

    return module;

});
