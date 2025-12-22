import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { User } from '../user/types/user.type';
import { SocketPayload } from './types/socket-payload.type';

export type SocketUsersLifecyclePayload = SocketPayload & {
  user: User;
};

export type SocketUsersAllPayload = SocketUsersLifecyclePayload[];

export type SocketUsersJoinPayload = SocketUsersLifecyclePayload;

export type SocketUsersLeavePayload = SocketUsersLifecyclePayload;

@Injectable({ providedIn: 'root' })
export class SocketUsersService {
  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  public users$: Observable<User[]> = this._users$.asObservable().pipe(shareReplay());

  public all(payload: SocketUsersAllPayload): void {
    payload.forEach((payloadEntry: SocketUsersLifecyclePayload): void => {
      payloadEntry.user._socketIds = [payloadEntry.socketId];
    });

    this._users$.next(
      payload.map((payloadEntry: SocketUsersLifecyclePayload): User => payloadEntry.user)
    );
  }

  public join(payload: SocketUsersJoinPayload): void {
    const users: User[] = this._users$.getValue();

    const userIndex: number = users.findIndex((user: User): boolean => user.id === payload.user.id);

    if (userIndex >= 0) {
      const existingUser: User = users[userIndex];

      existingUser._socketIds = existingUser._socketIds || [];

      if (!existingUser._socketIds.includes(payload.socketId)) {
        existingUser._socketIds.push(payload.socketId);
      }

      this._users$.next([...users]);
    } else {
      const newUser: User = {
        ...payload.user,
        _socketIds: [payload.socketId],
      };

      this._users$.next([...users, newUser]);
    }
  }

  public leave(payload: SocketUsersLeavePayload): void {
    const currentUsers: User[] = this._users$.getValue();

    const updatedUsers: User[] = currentUsers
      .map((user: User): User => {
        if (user.id === payload.user.id) {
          return {
            ...user,
            _socketIds: (user._socketIds || []).filter(
              (id: string): boolean => id !== payload.socketId
            ),
          };
        }

        return user;
      })
      .filter((user: User): boolean => user._socketIds?.length > 0);

    this._users$.next(updatedUsers);
  }
}
