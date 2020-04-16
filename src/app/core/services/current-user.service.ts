import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {CurrentUser, Role} from '../model/current-user.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  readonly user$ = new ReplaySubject<CurrentUser>(1);

  constructor(private authService: AuthService) {
  }

  initialize(): Promise<void> {
    return new Promise<void>(resolve => {
      this.authService.loadProfile().subscribe(profile => {
        this.user$.next(profile);
        resolve();
      });
    });
  }

  hasRole(...roles: Role[]): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        if (!user.authenticated) {
          return false;
        }
        const userRoles = user.info.role;
        return userRoles.find(role => roles.includes(role)) != undefined;
      })
    );
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
