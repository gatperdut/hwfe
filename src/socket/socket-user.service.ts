import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/types/user.type';

export type UsersAllPayload = User[];

export type UsersJoinPayload = User;

export type UsersLeavePayload = User;

@Injectable({ providedIn: 'root' })
export class SocketUserService {
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  public all(payload: UsersAllPayload) {
    console.log('Users all:', payload);
  }

  public join(payload: UsersJoinPayload) {
    console.log('Users join:', payload);
  }

  public leave(payload: UsersLeavePayload) {
    console.log('Users leave:', payload);
  }
}
