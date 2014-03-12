/* global define */

define(['services/asset',
        'services/config',
        'services/template',
        'utils'], function (Asset, Config, Template, Utils) {

    'use strict';

    return Object.freeze({
        Asset: Asset,
        Config: Config,
        Template: Template,
        Utils: Utils
    });

});
