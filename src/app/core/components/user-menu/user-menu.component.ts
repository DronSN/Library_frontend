import {Component, Inject, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  username: string;
  password: string;
}

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
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.handleLoginSubmit(result);
    });
  }

  handleLoginSubmit(value: DialogData) {
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
        err => {console.log(err);
                if (err.status === 404) {
                  this.openSnackBar('Неверное имя пользователя или пароль');
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

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onOkClick(): void {
    this.dialogRef.close({
      username: this.username.value,
      password: this.password.value
    });
  }
  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Введите значение';
    }
    return formControl.invalid ? 'Неверное значение' : '';
  }
}
