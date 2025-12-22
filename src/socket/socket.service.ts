import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';
import {
  SocketUsersAllPayload,
  SocketUsersJoinPayload,
  SocketUsersLeavePayload,
  SocketUsersService,
} from './socket-users.service';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socketUsersService: SocketUsersService = inject(SocketUsersService);

  private socket: Socket = io(environment.apiUrl, { autoConnect: false });

  constructor() {
    this.socket.on('users:all', (payload: SocketUsersAllPayload): void => {
      this.socketUsersService.all(payload);
    });

    this.socket.on('users:join', (payload: SocketUsersJoinPayload): void => {
      this.socketUsersService.join(payload);
    });

    this.socket.on('users:leave', (payload: SocketUsersLeavePayload): void => {
      this.socketUsersService.leave(payload);
    });
  }

  public connect(token: string): void {
    this.socket.auth = {
      token: token,
    };

    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.auth = {};

    this.socket.disconnect();
  }
}
