# Studio JS Services

[Crafter Studio](https://github.com/quiaro/studio3) provides a [RESTful API](http://studio3.craftercms.org/studio-server/documentation.html) to manage all its resources.

Studio JS Services intends to simplify interaction with Crafter Studio's RESTful API by exposing a simpler API as a collection of Javascript methods.

## Benefits

* Avoid dependencies on Crafter Studio services URIs
* Simplify the generation of requests by providing an abstraction level
* Keep requests easier to read and maintain by providing a [promise-like API](http://api.jquery.com/category/deferred-object/).

## Getting Studio JS Services

There are a couple of ways of getting Studio JS Services

* [Download it](https://github.com/quiaro/studio-js-services) from GitHub
* Install it into your project via bower (`bower install studio-js-services`)

## Examples

### Basic example

```javascript
// create a function to receive messages
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

// add the function to the list of subscribers for a particular message
// we're keeping the returned token, in order to be able to unsubscribe
// from the message later on
var token = PubSub.subscribe( 'MY MESSAGE', mySubscriber );

// publish a message asyncronously
PubSub.publish( 'MY MESSAGE', 'hello world!' );

// publish a message syncronously, which is faster in some environments,
// but will get confusing when one message triggers new messages in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
PubSub.publishSync( 'MY MESSAGE', 'hello world!' );
```
