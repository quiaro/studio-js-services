define([], function() {

    function runWith (AssetServices) {

        if (window.Blob) {

            blob = new Blob(['Hello world!'], { type: 'text/plain' });

            AssetServices.create({
                parent_id: '/test/path',
                file_name: 'asset_sample.txt',
                file: blob,
                mime_type: 'text/plain'
            }).then(function(asset){

                console.log('Created new asset: ',  asset);

                if (asset && asset.id && asset.id.itemId) {
                    console.log('Get contents from asset with id: ', asset.id.itemId);

                    AssetServices.getContent(asset.id.itemId)
                        .then(function(content){
                            console.log('Asset Content: ', content);

                            blob = new Blob(['Bonjour monde!'], { type: 'text/plain' });

                            AssetServices.update({
                                item_id: asset.id.itemId,
                                file: blob
                            }).then(function(asset){
                                console.log('Asset Content Updated: ', asset);

                                AssetServices.readText(asset.id.itemId)
                                    .then(function(text) {
                                        console.log('Asset ReadText: ', text);

                                        AssetServices.delete(asset.id.itemId)
                                            .then(function(){
                                                console.log('Asset Deleted');

                                                AssetServices.read(asset.id.itemId)
                                                .then(function(metadata) {
                                                    console.log('Asset exists after deletion: ', metadata);
                                                }, function() {
                                                    console.log('Asset was successfully deleted!');
                                                });

                                            });
                                    });
                            })
                        });

                    AssetServices.read(asset.id.itemId)
                        .then(function(metadata) {
                            console.log('Asset Read: ', metadata);
                        });

                    AssetServices.readText(asset.id.itemId)
                        .then(function(text) {
                            console.log('Asset ReadText: ', text);
                        });
                }

            });

        } else {
            console.log('Unable to test the Asset services. The browser does not have supoort for the Blob API');
        }
    }

    return {
        runWith: runWith
    };

});
