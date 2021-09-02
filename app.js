'use strict'
require('dotenv').config()
var osc = require("osc")
const express = require('express')
//APP
const app  = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
app.listen(PORT)
const UDPPort = new osc.UDPPort({
  localAdrress : HOST,
  localPort : PORT
})
console.log(UDPPort)
var client = require("socket.io-client");
var socket = client.connect("ws://oscweb.herokuapp.com")
socket.open()
UDPPort.open()
UDPPort.on("message", function (oscMsg, timeTag, info) {
  console.log(oscMsg)
  socket.emit("message", oscMsg)
})
  UDPPort.on("ready", function () {
    console.log(" OSC ready!", HOST, PORT)
})
