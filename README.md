# Crafter Studio Services

## Key features

* feature 1
* feature 2

## Getting PubSubJS

There are several ways of getting PubSubJS

* [Download a tagged version](https://github.com/mroderick/PubSubJS/tags) from GitHub
* Install via npm (`npm install pubsub-js`)
* Intall via bower (`bower install pubsub-js`)

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
