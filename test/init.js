
requirejs(['studioServices'], function(StudioServices) {

    var services = new StudioServices({
            services: {
                domain: 'studio3.craftercms.org'
            },
            api: {
                base: 'studio-server/api'
            }
        }),
        blob;

    // services.Config.getDescriptor('crafter.studio-ui.section.dashboard')
    //     .then(function(descriptor){
    //         console.log('Descriptor: ', descriptor);
    //     });

    // services.Config.getPlugins('activity')
    //     .then(function(descriptor){
    //         console.log('Plugins: ', descriptor);
    //     });

    services.Utils.setSite('coconut');

    if (window.Blob) {

        blob = new Blob(["Hello world!"], { type: "text/plain" });

        services.Asset.create({
            parent_id: '/test/path',
            file_name: 'new_content.jpeg',
            file: blob,
            mime_type: 'image/jpeg'
        }).then(function(asset){

            console.log('Created new asset: ',  asset);

            if (asset && asset.id && asset.id.itemId) {
                console.log('Get contents from asset with id: ', asset.id.itemId);

                services.Asset.getContent(asset.id.itemId)
                    .then(function(content){
                        console.log('Asset Content: ', content);

                        services.Asset.delete(asset.id.itemId)
                            .then(function(){
                                console.log('Asset Deleted');

                                // TO-DO: Verify that the asset was deleted
                                // services.Asset.getContent(asset.id.itemId)
                                //     .then(function(content){
                                //         console.log('Asset Content: ', content);

                            });
                    });
            }

        });

    } else {
        console.log("Unable to test the Asset services. The browser does not have supoort for the Blob API");
    }

});
