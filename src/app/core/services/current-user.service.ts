import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {CurrentUser, Role} from '../model/current-user.model';
import {AuthService} from './auth.service';
import {UserDetails} from '../model/user-details.model';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  readonly user$ = new ReplaySubject<CurrentUser>(1);

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  initialize(): Promise<void> {
    return new Promise<void>(resolve => {
      this.authService.loadProfile().subscribe(profile => {
        this.user$.next(profile);
        resolve();
      });
    });
  }

  hasRole(role: Role): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        if (!user.authenticated) {
          return false;
        }
        const userRole = user.info.role;
        return userRole === role;
        // return userRoles.find(role => roles.includes(role)) != undefined;
      })
    );
  }
  findUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  updateUser(user: User): Observable<User> {
    const id = user.id;
    return this.http.put<User>(`/api/users/${id}`, user);
  }
}

export function loadCurrentUser(currentUserService: CurrentUserService): () => Promise<void> {
  return () => currentUserService.initialize();
}

export const LOAD_CURRENT_USER_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: loadCurrentUser,
  multi: true,
  deps: [CurrentUserService]
};
