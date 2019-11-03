This microservice handles all of the advance chat features that a normal discord client/account would not normally handle.
    - Gifs
    - Large Files
    - etc

This microservice will depend on a database microservice which will keep track of what messages have been sent (only meesages that utilise the AdcChat Server, normal messages will be ignored)

The microservice this will depend on will be `WhatData_WAPI`