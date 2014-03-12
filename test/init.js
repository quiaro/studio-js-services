
requirejs(['studioServices'], function(StudioServices) {

    console.log('Testing crafter studio services ...');

    StudioServices.Asset.find(60).then(function( value ) {
        console.log('Promise resolved with value: ', value);
    });

    StudioServices.Config.getDescriptor('crafter.studio-ui.section.dashboard')
        .then(function(descriptor){
            console.log('Descriptor: ', descriptor);
        });

});
