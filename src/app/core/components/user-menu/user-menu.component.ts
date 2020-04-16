import {Component, Inject, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  username: string;
  password: string;
}


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  readonly user$ = this.currentUser.user$;
  username: string;
  password: string;
  constructor(private currentUser: CurrentUserService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.user$);
  }
  handleLogoutClick() {
    console.log('Войти');
    this.authService.logout()
        .pipe(switchMap(() => this.authService.loadProfile()))
        .subscribe(user => {
         this.currentUser.user$.next(user);
         // this.router.navigate([''], {
        //   relativeTo: this.activeRoute
       });
    }

  loginClick() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {username: this.username, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.handleLoginSubmit(result);
      // this.username = result.;
    });
  }

  handleLoginSubmit(value: DialogData) {
    this.authService.login({
      username: value.username,
      password: value.password
    }).pipe(
      switchMap(() => this.authService.loadProfile())
    ).subscribe(
      profile => {
        this.currentUser.user$.next(profile);
        console.log(this.user$);
      // this.router.navigateByUrl('/');
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

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
