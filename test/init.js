
requirejs(['studioServices'], function(StudioServices) {

    var services = new StudioServices({
            services: {
                domain: '127.0.0.1',
                port: '3000'
            }
        });

    services.Config.getDescriptor('crafter.studio-ui.section.dashboard')
        .then(function(descriptor){
            console.log('Descriptor: ', descriptor);
        });

    services.Config.getPlugins('activity')
        .then(function(descriptor){
            console.log('Plugins: ', descriptor);
        });

});
