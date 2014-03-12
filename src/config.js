/* global define */

define(function() {

    'use strict';

    var settings = {
        apiVersion: 1,
        domain: '127.0.0.1',
        port: '3000',
        protocol: 'http',
        site: '',
        urlBase: 'api'
    };

    function setSite(siteName) {

        if (DEBUG) { console.log('Calling setSite with params: ', arguments); }

        if (typeof siteName === 'string' && !!siteName) {
            settings.site = siteName;
        } else {
            throw new Error('Incorrect value for site name: ', siteName);
        }
    }

    function getSite() {
        return settings.site;
    }

    function getBaseUrl() {
        var path;

        if (settings.domain) {
            path = [settings.protocol, '://',
                    settings.domain, ':', settings.port,
                    '/', settings.urlBase, '/', settings.apiVersion].join("");
        } else {
            path = ['/', settings.urlBase, '/', settings.apiVersion].join("");
        }
        return path;
    }

    return {
        getSite: getSite,
        getBaseUrl: getBaseUrl,
        setSite: setSite
    };

});

