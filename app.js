'use strict'
require('dotenv').config()
var osc = require("osc")

const express = require('express')
//APP
const app  = express()
const PORT =   12000
const HOST =   process.env.HOST
app.listen(PORT)
const UDPPort = new osc.UDPPort({
  localAdrress : HOST,
  localPort : PORT
})
var client = require("socket.io-client");
var socket = client.connect("https://oscweb.herokuapp.com");
socket.emit("message", "foo");
UDPPort.open()
UDPPort.on("message", function (oscMsg, timeTag, info) {
  console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", info);
})
  UDPPort.on("ready", function () {
    console.log(" OSC ready!", HOST, PORT);
})
