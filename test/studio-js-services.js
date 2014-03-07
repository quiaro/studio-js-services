requirejs.config({
    baseUrl: '/'
});

requirejs(['src/studio-js-services'], function(StudioServices) {

    console.log('Testing crafter studio services ...');

    StudioServices.Asset.find(60).then(function( value ) {
        console.log('Promise resolved with value: ', value);
    });

});
