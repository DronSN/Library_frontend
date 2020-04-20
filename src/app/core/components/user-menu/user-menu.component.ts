import {Component} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginComponent} from './modal-dialogs/login/login.component';
import {LoginData} from '../../model/auth.model';
import {SignupComponent} from './modal-dialogs/signup/signup.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUser, Role} from '../../model/current-user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  readonly user$ = this.currentUser.user$;
  public currHome = '';

  constructor(private currentUser: CurrentUserService,
              private authService: AuthService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  handleLogoutClick() {
    this.authService.logout()
        .pipe(switchMap(() => this.authService.loadProfile()))
        .subscribe(user => {
         this.currentUser.user$.next(user);
         this.currHome = '';
         this.router.navigate([this.currHome], {
           relativeTo: this.activeRoute
       });
         this.openSnackBar('Выполнен выход из профиля');
    });
  }
  loginClick() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.handleLoginSubmit(result);
    });
  }

  signupClick() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '255px',
      height: '380px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.handleLoginSubmit(result);
    });
  }


  handleLoginSubmit(value: LoginData) {
    if (value != null) {
      this.authService.login({
        username: value.username,
        password: value.password
      }).pipe(
        switchMap(() => this.authService.loadProfile())
      ).subscribe(
        profile => {
          this.currentUser.user$.next(profile);
          if (profile.authenticated === true) {
            const loggedUser: LoggedUser = profile as LoggedUser;
            if (loggedUser.info.role === Role.ADMIN) {
              this.currHome = '/admin';
            } else if (loggedUser.info.role === Role.USER) {
              this.currHome = '/user';
            } else {
              this.currHome = '';
            }
            this.router.navigateByUrl(this.currHome);
          }
        },
        err => {if (err.status === 404) {
                  this.openSnackBar('Неверное имя пользователя или пароль');
          } else if (err.status === 504) {
                  this.openSnackBar('Сервер недоступен. Повторите попытку позже.');
                }
        }
        // () => {
        //   this.form.control.setErrors({
        //     server: true
        //   });
        //   this.form.controls.username.setErrors({
        //     'login-incorrect': true
        //   });
        //   this.form.controls.password.setErrors({
        //     'login-incorrect': true
        //  });
        // }
      );
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok',
      {
        duration: 7000,
        verticalPosition: 'top'
      });
  }
}
