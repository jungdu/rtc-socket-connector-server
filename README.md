# rtc-socket-connector-server

rtc-socket-connector-server is library for WebRTC connection.  
This library used with [**rtc-socket-connector-client**]([r](https://github.com/jungdu/rtc-socket-connector-client))  
It is easy to use WebRTC with **rtc-socket-connector-server** and [**rtc-socket-connector-client**](https://github.com/jungdu/rtc-socket-connector-client).  
**Example using this library**: [rtc-socket-connector-example](https://github.com/jungdu/rtc-socket-connector-example)


# How to use

### 1. Create socket server  
To use rtc-socket-connector-server, you need socket server.
Create a socket server through the process below.
```javascript
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(server);
```

### 2. add handlers to Socket Server

Use **addRTCConnectionHandlers** to handle socket messages form client.

```javascript
const { addRTCConnectionHandlers } = require("rtc-socket-connector-server")

addRTCConnectionHandler(socketServer});
```

### 3. Start the server
Run script file to run express server.  
A client will send socket messages to the express server.
The express server will send messages from a client to target client.


# API

### addRTCConnectionHandler(server, option)
**Arguments**
- server: Socket server created by using socket.io
- option
  - debug```<boolean>```: Set ```true``` to log messages for initiating peer connections and ICE candidates.
