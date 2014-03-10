/* global define */

define(['asset', 'template'], function (Asset, Template) {

    'use strict';

    var Services = {};

    Services.Asset = Asset;
    Services.Template = Template;

    return Object.freeze(Services);

});
