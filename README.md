# Promise Enabled Domain Driven Event Library with Angular module

### Description
Created for cross controller communication in a large scale angular SPA.  Requires bluebird and lodash.
<br/><br/>

#### $event API
###### $event.instance('Domain')
  Creates an emitter instance attached to Domain

###### $event.runScript(script)
  Runs event script.  See sample script for example
<br/><br/>
  
  
####  Emitter Instance API
###### emitter.on(event, function)
Attaches a function to a domain event.  May return a promise for asynchronous events.

###### emitter.emit(event, data)
Broadcasts event to all emitter instances attached to the broadcastings emitter's domain.
Returns a promise which resolves when all the event handler return promises are resolved.

###### emitter.destroy()
Detaches the emitter instance from the domain so it may be garbage collected.
