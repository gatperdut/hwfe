import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket = io(environment.apiUrl, { autoConnect: false });

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

  constructor() {
    this.socket.on('connect', (): void => {
      console.log('Socket connected:');
    });

    this.socket.on('disconnect', (): void => {
      console.log('Socket disconnected');
    });

    this.socket.on('users', (d) => {
      console.log('users event', d);
    });
  }
}
