/* global define */

define(['services/asset',
        'services/config',
        'services/descriptor',
        'services/template',
        'utils'], function (Asset, Config, Descriptor, Template, Utils) {

    'use strict';

    return function(customConfig) {

        var utils = new Utils(customConfig),
            asset = new Asset(utils),
            config = new Config(utils),
            descriptor = new Descriptor(utils),
            template = new Template(utils);

        return Object.freeze({
            Asset: asset,
            Config: config,
            Descriptor: descriptor,
            Template: template,
            Utils: utils
        });
    };

});
