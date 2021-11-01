import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });
const subject = new WebSocket("ws://localhost:8081");

wss.on("connection", function connection(ws) {

    ws.on('open', (event) => {
        console.log('New Connection')
    })

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  wss.on("error", function incoming(error) {
    console.log("received error: %s", error);
  });

  ws.send("something");
});

export function sendMessage(text) {
  subject.send(text);
}
