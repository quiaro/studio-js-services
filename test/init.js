
requirejs(['studioServices'], function(StudioServices) {

    StudioServices.Config.getDescriptor('crafter.studio-ui.section.dashboard')
        .then(function(descriptor){
            console.log('Descriptor: ', descriptor);
        });

    StudioServices.Config.getPlugins('activity')
        .then(function(descriptor){
            console.log('Plugins: ', descriptor);
        });

});
