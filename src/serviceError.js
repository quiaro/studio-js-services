/* global define */

define(function(){

    return function(data) {

        return Object.create(Error.prototype, {
            type: {
                value: data.type || "StudioJSServiceError"
            },
            name: {
                value: "StudioJSServiceError"
            },
            message: {
                value: data.message || ""
            }
        });
    };

});
