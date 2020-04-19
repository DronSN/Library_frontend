import {Component, Inject, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginComponent} from './modal-dialogs/login/login.component';
import {LoginData} from '../../model/auth.model';
import {SignupComponent} from './modal-dialogs/signup/signup.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  readonly user$ = this.currentUser.user$;

  constructor(private currentUser: CurrentUserService,
              private authService: AuthService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  handleLogoutClick() {
    this.authService.logout()
        .pipe(switchMap(() => this.authService.loadProfile()))
        .subscribe(user => {
         this.currentUser.user$.next(user);
         // this.router.navigate([''], {
        //   relativeTo: this.activeRoute
       });
    this.openSnackBar('Выполнен выход из профиля');
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
        // this.router.navigateByUrl('/');
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
