/* global define */

define(['services/asset',
        'services/config',
        'services/template',
        'utils'], function (Asset, Config, Template, Utils) {

    'use strict';

    return function(customConfig) {

        var utils = new Utils(customConfig),
            config = new Config(utils),
            asset = new Asset(utils);

        return Object.freeze({
            Asset: asset,
            Config: config,
            Template: Template,
            Utils: utils
        });
    };

});
