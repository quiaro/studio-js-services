define([], function() {

    function runWith (ConfigServices) {

        ConfigServices.getDescriptor('crafter.studio-ui.section.dashboard')
            .then(function(descriptor){
                console.log('Descriptor: ', descriptor);
            });

        ConfigServices.getPlugins('activity')
            .then(function(descriptor){
                console.log('Plugins: ', descriptor);
            });
    }

    return {
        runWith: runWith
    };

});
