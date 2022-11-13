import {
    MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
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
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit  {
    constructor() {}
    @WebSocketServer()
    server: Server;
    wsClients=[];

    @SubscribeMessage('send-message')
    sendMessage(@MessageBody() data: any) {
        // TODO: create bidirectional hashing using cryptojs
        // broadcast to affected room
        this.broadcast('receive-message', data)
    }
    afterInit() {
    }

    handleConnection(client: any) {
        this.wsClients.push(client);
    }

    handleDisconnect(client) {
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i] === client) {
                this.wsClients.splice(i, 1);
                break;
            }
        }
        this.broadcast('disconnect',{});
    }
    private broadcast(event, message: any) {
        for (let c of this.wsClients) {
            c.emit(event, message);
        }
    }
}
