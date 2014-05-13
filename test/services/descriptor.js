define([], function() {

    function runWith (DescriptorServices) {

        var content, editContent, blob, editBlob;

        content = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                 '<page>\n' +
                 '  <content-type>/page/page</content-type>\n' +
                 '  <merge-strategy>inherit-levels</merge-strategy>\n' +
                 '  <file-name>site-dashboard.xml</file-name>\n' +
                 '  <folder-name>site-dashboard</folder-name>\n' +
                 '  <internal-name>Site Dashboard</internal-name>\n' +
                 '  <title>PAGE-TITLE-SITE-DASHBOARD</title>\n' +
                 '  <url>site-dashboard</url>\n' +
                 '  <template>site-dashboard</template>\n' +
                 '  <createdDate>1/3/2014 14:57:31</createdDate>\n' +
                 '  <lastModifiedDate>1/3/2014 14:57:31</lastModifiedDate>\n' +
                 '</page>\n';

        editContent = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                     '<page>\n' +
                     '  <content-type>/page/page</content-type>\n' +
                     '  <merge-strategy>inherit-levels</merge-strategy>\n' +
                     '  <file-name>site-dashboard-updated.xml</file-name>\n' +
                     '  <folder-name>site-dashboard</folder-name>\n' +
                     '  <internal-name>Updated Site Dashboard</internal-name>\n' +
                     '  <title>UPDATED TITLE</title>\n' +
                     '  <url>site-dashboard-updated</url>\n' +
                     '  <template>site-dashboard-updated</template>\n' +
                     '  <createdDate>1/3/2014 14:57:31</createdDate>\n' +
                     '  <lastModifiedDate>3/3/2014 11:11:11</lastModifiedDate>\n' +
                     '</page>\n';

        if (window.Blob) {

            blob = new Blob([content], { type: 'application/xml' });

            editBlob = new Blob([editContent], { type: 'application/xml' });

            DescriptorServices.create({
                content_type_id: 'sampleId',
                parent_id: '/site',
                file_name: 'descriptor_file_sample.xml',
                file: blob
            }).then(function(descriptor){
                console.log('New descriptor from file: ', descriptor);

                if (descriptor && descriptor.id && descriptor.id.itemId) {
                    console.log('Read descriptor with id: ', descriptor.id.itemId);

                    DescriptorServices.list().then( function (descriptors) {
                        console.log('Listing descriptors at the root level: ', descriptors);
                    })

                    DescriptorServices.readText(descriptor.id.itemId)
                        .then(function(text){
                            console.log('Text content from descriptor: ', text);
                        });

                    DescriptorServices.read(descriptor.id.itemId)
                        .then(function(metadata) {
                            console.log('Descriptor read: ', metadata);

                            // DescriptorServices.move({
                            //     item_id: descriptor.id.itemId,
                            //     parent_id: '/test/moved_path',
                            //     file_name: 'file_sample_moved.xml'
                            // }).then(function(descriptor) {
                            //         console.log('Descriptor moved: ', descriptor);

                                DescriptorServices.update({
                                    item_id: descriptor.id.itemId,
                                    file: editBlob
                                }).then(function(descriptor){
                                    console.log('Descriptor updated via file: ', descriptor);

                                    DescriptorServices.readText(descriptor.id.itemId)
                                        .then(function(text){
                                            console.log('Text content from descriptor: ', text);
                                        });

                                    DescriptorServices.delete(descriptor.id.itemId)
                                        .then(function(){
                                            console.log('Descriptor deleted');

                                            DescriptorServices.read(descriptor.id.itemId)
                                                .then(function(metadata) {
                                                    console.log('Descriptor exists after deletion: ', metadata);
                                                }, function() {
                                                    console.log('Descriptor was successfully deleted!');
                                                });
                                        });
                                });
                            // });
                        });
                }
            });

        } else {
            console.log('Unable to test some of the Descriptor services. The browser does not have supoort for the Blob API');
        }

        DescriptorServices.create({
            content_type_id: 'sampleId',
            parent_id: '/test/path',
            file_name: 'descriptor_content_sample.xml',
            content: content
        }).then(function(descriptor){
            console.log('New descriptor from inline content: ', descriptor);

            if (descriptor && descriptor.id && descriptor.id.itemId) {

                DescriptorServices.readText(descriptor.id.itemId)
                    .then(function(text){
                        console.log('Text content from descriptor: ', text);
                    });

                // DescriptorServices.duplicate({
                //     item_id: descriptor.id.itemId,
                //     parent_id: '/test/duplicate/path',
                //     file_name: 'content_sample_duplicate.xml'
                // }).then(function(duplicate){
                //         console.log('Descriptor duplicate: ', duplicate);

                //     DescriptorServices.read(duplicate.id.itemId)
                //         .then(function(metadata) {
                //             console.log('Duplicate read: ', metadata);

                //             DescriptorServices.delete(duplicate.id.itemId)
                //                 .then(function(){
                //                     console.log('Duplicate deleted');

                //                     DescriptorServices.read(duplicate.id.itemId)
                //                         .then(function(metadata) {
                //                             console.log('Duplicate exists after deletion: ', metadata);
                //                         }, function() {
                //                             console.log('Duplicate was successfully deleted!');
                //                         });
                //             });
                //         });
                // });

                // DescriptorServices.update({
                //     item_id: descriptor.id.itemId,
                //     content: editContent
                // }).then(function(descriptor){
                //     console.log('Descriptor updated via inline content: ', descriptor);

                    DescriptorServices.readText(descriptor.id.itemId)
                        .then(function(text){
                            console.log('Text content from descriptor: ', text);
                    });

                    DescriptorServices.delete(descriptor.id.itemId)
                        .then(function(){
                            console.log('Descriptor deleted');

                            DescriptorServices.read(descriptor.id.itemId)
                                .then(function(metadata) {
                                    console.log('Descriptor exists after deletion: ', metadata);
                                }, function() {
                                    console.log('Descriptor was successfully deleted!');
                                });
                    });
                // });
            }

        });

    }

    return {
        runWith: runWith
    };

});
