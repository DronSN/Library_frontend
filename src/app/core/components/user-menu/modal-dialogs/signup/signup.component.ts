import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginData} from '../../../../model/auth.model';
import {RegistrationService} from '../../../../services/registration.service';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {CurrentUserService} from '../../../../services/current-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  username = new FormControl('', [Validators.required], this.validateUniqueUsername.bind(this) );
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordDoub = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    public registration: RegistrationService,
    public currentuser: CurrentUserService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.registration.addNewRegularUser({
      username: this.username.value,
      password: this.password.value
    }).subscribe(() => {
      this.dialogRef.close({
        username: this.username.value,
        password: this.password.value
      });
    });
  }
  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Введите значение';
    } else if (formControl.hasError('UsernameNotUnique')) {
      return 'Имя пользователя занято';
    } else if (formControl.hasError('minlength')) {
      return 'Мало символов';
    }
    return formControl.invalid ? 'Неверное значение' : '';
  }
  isRegButtonDisabled(): boolean {
   return this.username.invalid || this.password.invalid  || (this.passwordDoub.value !== this.password.value);
  }
  validateUniqueUsername({value}: AbstractControl): Observable<ValidationErrors | null> {
    return this.registration.isValidUsername(value)
      .pipe(
        debounceTime(500), map((nameValid: boolean) => {
        if (!nameValid) {
          return {
            UsernameNotUnique: true
          };
        }
        return null;
      })
      );
  }
}
