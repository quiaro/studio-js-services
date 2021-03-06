
requirejs(['studioServices/studioServices',
           'test.js'], function(StudioServices, test) {

    var services = new StudioServices({
            server: {
                domain: 'studio3.craftercms.org',
                port: ''
            },
            api: {
                base: 'api'
            }
        });

    services.Utils.setSite('coconut');

    test(services.Asset);
    // test(services.Config);
    test(services.Descriptor);
    test(services.Template);

});
