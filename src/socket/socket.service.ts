import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';
import { User } from '../user/types/user.type';
import { SocketUserService } from './socket-user.service';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socketUserService: SocketUserService = inject(SocketUserService);

  private socket: Socket = io(environment.apiUrl, { autoConnect: false });

  constructor() {
    this.socket.on('users:all', (users: User[]): void => {
      this.socketUserService.all(users);
    });

    this.socket.on('users:join', (user: User): void => {
      this.socketUserService.join(user);
    });

    this.socket.on('users:leave', (user: User): void => {
      this.socketUserService.leave(user);
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
