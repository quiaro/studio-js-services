/* global define */

define(function(){

    return function(data) {

        return Object.create(Error.prototype, {
            type: {
                value: data.type || "ServiceError"
            },
            name: {
                value: "ServiceError"
            },
            message: {
                value: data.message || ""
            }
        });
    };

});
