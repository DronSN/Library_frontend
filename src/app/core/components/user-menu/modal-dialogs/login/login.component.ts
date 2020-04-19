import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginData} from '../../../../model/auth.model';

// export interface DialogData {
//   username: string;
//   password: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData) {}

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
