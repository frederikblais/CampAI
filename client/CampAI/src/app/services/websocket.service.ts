import { environment } from 'src/environments/environment';

export class WebsocketService {
  ws: WebSocket | undefined;
  chatMessages: any[] = [];
  public openWebSocket(): void {
    this.ws = new WebSocket(environment.wsEndpoint);
    this.ws.onopen = (event) => {
      console.log('open: ', event);
    };
    this.ws.onerror = (event) => {
      console.log('error event: ', event);
    };
    this.ws.onmessage = (event) => {
      console.log('message event: ', event);
      // console.log('event received: ', JSON.parse(event));
      this.chatMessages.push(JSON.parse(event.data));
      console.log(this.chatMessages)
    };
    this.ws.onclose = (event) => {
      console.log('close event: ', event);
    };
  }
  sendMessage(message: string) {
    this.ws?.send(message);
  }
}
