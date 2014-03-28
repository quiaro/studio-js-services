define(['./services/asset.js',
        './services/config.js',
        './services/descriptor.js',
        './services/template.js'],
        function(AssetTests, ConfigTests, DescriptorTests, TemplateTests) {

    return function(services) {

        switch( services.name ) {
            case 'Asset': AssetTests.runWith(services); break;
            case 'Config': ConfigTests.runWith(services); break;
            case 'Descriptor': DescriptorTests.runWith(services); break;
            case 'Template': TemplateTests.runWith(services); break;
            default:
                throw new Error('No services module found with name: ', services.name);
        }
    }

});
