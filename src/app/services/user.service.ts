import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersState = signal<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);

  public users = this.usersState.asReadonly();

  addUser(name: string) {
    if (name) {
      this.usersState.update(users => [...users, { id: Date.now(), name }]);
    }
  }
}
