# rtc-socket-connector-server

rtc-socket-connector-server is library for WebRTC connection.  
This library used with [**rtc-socket-connector-client**]([r](https://github.com/jungdu/rtc-socket-connector-server))  
It is easy to use WebRTC with **rtc-socket-connector-server** and [**rtc-socket-connector-client**](https://github.com/jungdu/rtc-socket-connector-server)


## How to use

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

addRTCConnectionHandler(socketServer, {cors: { origin: "<YOUR DOMAIN>"}});
```

### 3. Start the server
Your server is ready to get socket messages from clients.  
Clients will send socket messages to connect to another clients.  
