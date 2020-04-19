import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginData} from '../../../../model/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordDoub = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
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
  isRegButtonDisabled(): boolean {
   return this.username.invalid || this.password.invalid  || (this.passwordDoub.value !== this.password.value);
  }
}
