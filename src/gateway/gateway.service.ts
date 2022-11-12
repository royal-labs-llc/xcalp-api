import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import {Messages} from '../models/message'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessageGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send-message')
    sendMessage(@MessageBody() data: any): Observable<WsResponse<Messages>> {
        return from([1]).pipe(map(item => ({ event: 'events', data: data } )));
    }
}
