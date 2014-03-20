# Studio JS Services

[Crafter Studio](https://github.com/craftercms/studio3) provides a [REST API](http://studio3.craftercms.org/studio-server/rest-api-doc) to manage all its resources.

Studio JS Services intends to simplify interaction with Crafter Studio's REST API by exposing a simpler API as a collection of Javascript methods.

## Benefits

* Avoid dependencies on Crafter Studio services URIs
* Simplify the generation of requests to Crafter Studio services by providing an abstraction level
* Keep requests to Crafter Studio services easier to read and maintain by providing a [promise-like API](http://api.jquery.com/category/deferred-object/)
* Encapsulation -[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) Module

## Getting Studio JS Services

There are a couple of ways of getting Studio JS Services

* Download the [latest version](https://github.com/quiaro/studio-js-services/tree/master/dist) (or a tagged version) of Studio JS Services from GitHub
* Install it into your project via bower (`bower install studio-js-services`)

## Usage

Being an AMD module, you will need [require.js](http://requirejs.org/docs/download.html#requirejs) to load Studio JS Services into your app.

Here is the body of a fictitious index.html page that includes Studio JS Services: 

    <body>
        <div>My Test Page</div>
        <script>
            var require = {
                paths: {
                    studioServices: 'path/to/studioServices.min.js',
                }
            };
        </script>
        <script src="require.js"></script>
        <script src="myapp.js"></script>
    </body>

This example saves in `studioServices` a reference to the minified version of Studio JS Services.

Then, in `myapp.js`, we load the services using `requirejs`:

    requirejs(['studioServices'], function( StudioServices ) {
        // Here we now have access to the StudioServices constructor

        // Create an instance of Studio JS Services with the default configuration
        var services = new StudioServices(); 

        // Set a site name if we want to access site-specific resources
        services.Utils.setSite('mySampleSite');

        // Let's read the asset with ID: a1b2-c3d4 from mySampleSite
        // and then print out its metadata
        services.Asset.read('a1b2-c3d4').then( function( metadata ) {
            console.log('Asset Metadata: ', metadata);
        });  
    }

### Configuration

Default configuration for Studio JS Services is the following:

    {
        server: {
            domain: '',
            port: '',
            protocol: 'http:'
        },
        site: '',
        api: {
            version: 1,
            base: 'api'
        }
    }

This configuration can be changed per your requirements and passed to the StudioServices constructor to override the defaults:

    // Override default configuration
    var services = new StudioServices({
            server: {
                domain: 'my-crafter-services.org',
            },
            api: {
                base: 'studio-server/api'
            }
        });

Requests from Studio JS Services will then have the following base URL: 

    http://my-crafter-services.org/studio-server/api/1/

### API

Studio JS Services has an API that logically matches all of the services exposed by Crafter Studio's [REST API](http://studio3.craftercms.org/studio-server/rest-api-doc). This means that for each REST service there is a corresponding Javascript method with the same name (in camel case). In Studio JS Services, these javascript methods are grouped into objects, each one named after a Crafter Studio resource. The following table summarizes this correspondence between REST services and Javascript methods:  

<table>
    <thead>
        <tr>
            <th>Resource</th>
            <th>Method + Service URI</th>
            <th>Service Name</th>
            <th>Javascript Method Name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="7">Asset</td>
            <td>GET /api/1/content/asset/find/{site}</td>
            <td>find</td>
            <td>find</td>
        </tr>
        <tr>
            <td>GET /api/1/content/asset/read_text/{site}</td>
            <td>read_text</td>
            <td>readText</td>
        </tr>
        <tr>
            <td>POST /api/1/content/asset/delete/{site}</td>
            <td>delete</td>
            <td>delete</td>
        </tr>
        <tr>
            <td>GET /api/1/content/asset/read/{site}</td>
            <td>read</td>
            <td>read</td>
        </tr>
        <tr>
            <td>GET /api/1/content/asset/get_content/{site}</td>
            <td>get_content</td>
            <td>getContent</td>
        </tr>
        <tr>
            <td>POST /api/1/content/asset/create/{site}</td>
            <td>create</td>
            <td>create</td>
        </tr>
        <tr>
            <td>POST /api/1/content/asset/update/{site}</td>
            <td>update</td>
            <td>update</td>
        </tr>
    </tbody>
</table>

This means that in order to use the get_content service using Studio JS Services, you would write the following:

    // Create an instance of StudioServices
    var services = new StudioServices();

    // Use the get_content service by calling its corresponding method
    services.Asset.getContent('asset-id-12345');

### StudioJSServiceError

If anything goes wrong while accessing any of the services, Studio JS Services will throw a custom error named `StudioJSServiceError`. To recover from this kind of error, you can write a try/catch clause, such as:

    try {
        services.Asset.getContent('asset-id-12345');
    } catch (e) {
        if (e.name === 'StudioJSServiceError') {
            alert('Unable to access the getContent service at this time');
        }
    }

The StudioJSServiceError has two other properties `type` and `message` with additional information on the error that allows for better error handling. For example:

    try {
        services.Asset.getContent('asset-id-12345');
    } catch (e) {
        if (e.name === 'StudioJSServiceError') {

            if (e.type === 'MissingField') {

                // Handle this known error
                alert('Please select a site and try again');

            } else {

                // Log the error message and continue
                console.log(e.message);
            }
        } else {
            
            // Uncaught error
            throw e;
        }
    }

### Debugging

During development, it may be useful to see additional debugging information logged by all the services. The unminified version of Studio JS Services (studioServices.js) makes use of the global variable `DEBUG` to turn on/off debugging information.

Debugging information will be off by default, but it can be turned on by setting the DEBUG variable to `true`. To turn on debugging in the previous `body` sample that included Studio JS Services, the DEBUG variable can be set as follows:

    <body>
        <div>My Test Page</div>
        <script>
            // Turn debugging information on
            var DEBUG = true;

            // Remember to use the un-minified version of Studio JS Services
            var require = {
                paths: {
                    studioServices: 'path/to/studioServices.js',
                }
            };
        </script>
        <script src="require.js"></script>
        <script src="myapp.js"></script>
    </body>


## Customizing Studio JS Services

1. To work on or build this application you will need to have [Node.js](http://nodejs.org/) installed.

  If you don't already have Node.js installed, you can do so in one of the following ways:

    * Using the [installer](http://nodejs.org/download/)
      *The Mac installer will install node under /usr/local/bin so you will need to have admin rights to complete the install.

    * [Building the source code](https://github.com/joyent/node/wiki/Installation)
     This way you can choose to install Node in a custom folder instead of a global directory by using the --prefix config option, thus you are not required to have admin rights to complete the install.

    * [Via a package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)


2. Load all npm modules by running in a console: `npm install`

3. Load all bower packages by running in a console: `bower install`

4. Run any of the [available grunt tasks](#grunttasks) to help during development or when building Studio JS Services

### <a name="grunttasks"></a>Tasks

1. Start a live-reloading web server on localhost for development to test the app as you change it:

    `grunt dev`

2. Build Studio JS Services for production and test it against a server on localhost. The built files will be in the root folder `dist`.

    `grunt build`

3. Build Studio JS Services for production. The built files will be in the root folder `dist`.

    `grunt dist`

4. Run [JSHint](http://www.jshint.com/) on Studio JS Services to ensure the code is compliant with all the lint rules.

    `grunt lint`

5. Remove all development and production folders created during tasks 1, 2, and 3.

    `grunt cl`
