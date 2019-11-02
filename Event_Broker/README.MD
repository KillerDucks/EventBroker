This microservice will handle communication between all of the microservices with a pub/sub model.

  AdvChat_Server               DrHouse_Server               Hertz_Broker
         |                           |                           |
|--------|---------------------------|---------------------------|--------|
|                               Event_Broker                              |
|-------------------------------------------------------------------------|