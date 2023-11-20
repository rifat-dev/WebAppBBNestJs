import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    if (message['data'] === 'В каких странах работает?') {
      this.server.emit('message', message);
      this.server.emit('message', { data: 'В никаких(' });
    } else if (message['data'] === 'Как работает поиск доступного жилья?') {
      this.server.emit('message', message);
      this.server.emit('message', {
        data: 'Примерно, как тут https://leetcode.com/problems/my-calendar-i/',
      });
    } else if (message['data'] === 'Как выбрать цену за жильё?') {
      this.server.emit('message', message);
      this.server.emit('message', { data: 'Цену определяете вы.' });
    } else if (message['data'] === 'От чего зависит цена?') {
      this.server.emit('message', message);
      this.server.emit('message', { data: 'От многих факторов...' });
    } else if (message['data'] === 'Как проходит оплата?') {
      this.server.emit('message', message);
      this.server.emit('message', { data: 'Пока никак(' });
    } else {
      this.server.emit('message', message);
    }
  }
}
