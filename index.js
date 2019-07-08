const express = require("express")
const socket = require("socket.io")
const app = express();
const port = 3000
const server = app.listen(port, () => {
  console.log("listening on port:" + port);
})
app.use(express.static("chess"));
const io = socket(server);
io.sockets.on("connection", (soc) => {
  //console.log(`new: ${soc.id}`);
  soc.on("move", (data) => {
    //    console.log(data);
    soc.broadcast.emit("move", data);
  })
})
