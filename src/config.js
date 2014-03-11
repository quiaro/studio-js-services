/* global define */

define(function() {

    'use strict';

    var settings = {
        apiVersion: 1,
        domain: '',
        port: '',
        site: '',
        urlBase: 'api'
    };

    function setSite(siteName) {
        if (typeof siteName === 'string' && !!siteName) {
            settings.site = siteName;
        } else {
            throw new Error('Incorrect value for site name: ', siteName);
        }
    }

    function getSite() {
        return settings.site;
    }

    return {
        settings: settings,
        setSite: setSite,
        getSite: getSite
    };

});

