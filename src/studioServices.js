/* global define */

define(['services/asset',
        'services/config',
        'services/template'], function (Asset, Config, Template) {

    'use strict';

    return Object.freeze({
        Asset: Asset,
        Config: Config,
        Template: Template
    });

});
