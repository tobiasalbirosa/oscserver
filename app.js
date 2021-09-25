'use strict'
require('dotenv').config()
var osc = require("osc")
const PORT = 6000
const HOST = "localhost"
var io = require("socket.io-client")
const socket = io.connect("https://oscweb.herokuapp.com", { transports: ["websocket"] })
socket.on('error', (error) => {
  console.log('error')
})
socket.on('connect', () => {
  console.log('connected to oscweb')
})
socket.io.on("error", (error) => {
 console.log(error)
})
const UDPPort = new osc.UDPPort({
  localAdrress : "localhost",
  localPort : PORT
})
let emitir = (oscMsg) =>{
  socket.emit("message", oscMsg)
}
UDPPort.open()
UDPPort.on("message", function (oscMsg, timeTag, info) {
  console.log(oscMsg)
  console.log(info)
  emitir(oscMsg)
})
  UDPPort.on("ready", function () {
    console.log(" OSC ready!", HOST, PORT)
})

console.log(UDPPort)