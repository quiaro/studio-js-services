define([], function() {

    function runWith (TemplateServices) {

        var content, editContent, blob, editBlob;

        content = '<html>\n' +
                 '<head>\n' +
                 '  <title>Welcome!</title>\n' +
                 '</head>\n' +
                 '<body>\n' +
                 '  <h1>\n' +
                 '    Welcome ${user}<#if user == "Big Joe">, oh great one!</#if>!\n' +
                 '  </h1>\n' +
                 '  <p>View our latest product:\n' +
                 '  <a href="${latestProduct.url}">${latestProduct.name}</a>!\n' +
                 '</body>\n' +
                 '</html>\n';

        editContent = '<html>\n' +
                     '<head>\n' +
                     '  <title>Bienvenu(e)!</title>\n' +
                     '</head>\n' +
                     '<body>\n' +
                     '  <h1>\n' +
                     '    Bienvenu(e) ${user}<#if user == "Big Joe">, son excellence!</#if>!\n' +
                     '  </h1>\n' +
                     '  <p>Voici notre meilleur produit:\n' +
                     '  <a href="${latestProduct.url}">${latestProduct.name}</a>!\n' +
                     '</body>\n' +
                     '</html>\n';

        if (window.Blob) {

            blob = new Blob([content], { type: 'application/xml' });

            editBlob = new Blob([editContent], { type: 'application/xml' });

            TemplateServices.create({
                content_type_id: 'sampleId',
                parent_id: '/test/path',
                file_name: 'template_file_sample.xml',
                file: blob
            }).then(function(template){
                console.log('New template from file: ', template);

                if (template && template.id && template.id.itemId) {
                    console.log('Read template with id: ', template.id.itemId);

                    TemplateServices.readText(template.id.itemId)
                        .then(function(text){
                            console.log('Text content from template: ', text);
                        });

                    TemplateServices.read(template.id.itemId)
                        .then(function(metadata) {
                            console.log('Descriptor read: ', metadata);

                            // TemplateServices.move({
                            //     item_id: template.id.itemId,
                            //     parent_id: '/test/moved_path',
                            //     file_name: 'file_sample_moved.xml'
                            // }).then(function(template) {
                            //         console.log('Descriptor moved: ', template);

                                TemplateServices.update({
                                    item_id: template.id.itemId,
                                    file: editBlob
                                }).then(function(template){
                                    console.log('Descriptor updated via file: ', template);

                                    TemplateServices.readText(template.id.itemId)
                                        .then(function(text){
                                            console.log('Text content from template: ', text);
                                        });

                                    TemplateServices.delete(template.id.itemId)
                                        .then(function(){
                                            console.log('Descriptor deleted');

                                            TemplateServices.read(template.id.itemId)
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

        TemplateServices.create({
            content_type_id: 'sampleId',
            parent_id: '/test/path',
            file_name: 'template_content_sample.xml',
            content: content
        }).then(function(template){
            console.log('New template from inline content: ', template);

            if (template && template.id && template.id.itemId) {

                TemplateServices.readText(template.id.itemId)
                    .then(function(text){
                        console.log('Text content from template: ', text);
                    });

                // TemplateServices.duplicate({
                //     item_id: template.id.itemId,
                //     parent_id: '/test/duplicate/path',
                //     file_name: 'content_sample_duplicate.xml'
                // }).then(function(duplicate){
                //         console.log('Descriptor duplicate: ', duplicate);

                //     TemplateServices.read(duplicate.id.itemId)
                //         .then(function(metadata) {
                //             console.log('Duplicate read: ', metadata);

                //             TemplateServices.delete(duplicate.id.itemId)
                //                 .then(function(){
                //                     console.log('Duplicate deleted');

                //                     TemplateServices.read(duplicate.id.itemId)
                //                         .then(function(metadata) {
                //                             console.log('Duplicate exists after deletion: ', metadata);
                //                         }, function() {
                //                             console.log('Duplicate was successfully deleted!');
                //                         });
                //             });
                //         });
                // });

                TemplateServices.update({
                    item_id: template.id.itemId,
                    content: editContent
                }).then(function(template){
                    console.log('Descriptor updated via inline content: ', template);

                    TemplateServices.readText(template.id.itemId)
                        .then(function(text){
                            console.log('Text content from template: ', text);
                    });

                    TemplateServices.delete(template.id.itemId)
                        .then(function(){
                            console.log('Descriptor deleted');

                            TemplateServices.read(template.id.itemId)
                                .then(function(metadata) {
                                    console.log('Descriptor exists after deletion: ', metadata);
                                }, function() {
                                    console.log('Descriptor was successfully deleted!');
                                });
                    });
                });
            }

        });

    }

    return {
        runWith: runWith
    };

});
