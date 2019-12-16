# Event Broker

So the Event_Broker is a microservice
it handles events between other services
via a pub/sub model
this mean a service can sub (subscribe) to a topic
and another service can pub (publish) to a said topic
the file structure is as follows:
+ QueueObj.js
  - Is basically a wrapper class around the generic JS Array data type
  - It just implements some extra helpful functions and simple array checks
+ SocketHandler.js
  - Its job is to handle a bunch of sockets and to send the the pub data of a said topic to the appropriate subscribers sub
+ SocketObj.js
  - Is a wrapper class around the node js sockets class net
  - It add features that sockets should have but that the Node net class does not implement already
  - The Class is very generic apart from some specific data handling of sub/pub events from clients
+ service.js
  - An entry point to the microservice
  - Basically a Socket Server and listens for clients that are trying to connect
  - When a client connects it create an instance of SocketObj.jss class of AdvSocket and pushes that into the SocketHandler.js