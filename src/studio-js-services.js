define(['lib/jquery-ajax/jquery-ajax'], function (DataProxy) {

    'use strict';

    var Services = {};

    var Asset = {
        find: function find (x) {
            var defer = DataProxy.Deferred();
            setTimeout(function(){
                defer.resolve(20);
            }, 2000);

            console.log('Find called with x: ', x);
            return defer.promise();
        }
    };

    var Template = {
        find: function find (y) {
            console.log('Find called with y: ', y);
        }
    }

    Services.Asset = Asset;
    Services.Template = Template;

    return Object.freeze(Services);

});
