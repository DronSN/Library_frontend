import {Component, Input, OnInit} from '@angular/core';
import {UserDetails} from '../../model/user-details.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentUser, LoggedUser, Role} from '../../model/current-user.model';
import {CurrentUserService, loadCurrentUser} from '../../services/current-user.service';
import {User} from '../../model/user.model';

interface UpdateForm {
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  id: number;
  role: Role;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  form: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private currentUser: CurrentUserService
) { this.buildForm(); }

  ngOnInit(): void {
    this.currentUser.user$.subscribe(
      profile => {if (profile.authenticated) {
        const user: LoggedUser = profile as LoggedUser;
        this.currentUser.findUserById(user.info.id).subscribe(x => { this.user = x;
                                                                     this.updateFormFromPerson({
            username: this.user.username,
            firstName: this.user.personalInfo.firstName,
            lastName: this.user.personalInfo.lastName,
            middleName: this.user.personalInfo.middleName,
            id: this.user.id,
            role: this.user.role
          });
        } );
      }});
    loadCurrentUser(this.currentUser);
  }

  handleUpdateSubmit(value: UserDetails) {
    console.log(value);
    this.currentUser.updateUser({
      username: value.username,
      id: value.id,
      role: value.role,
      personalInfo: {
        firstName: value.firstName,
        lastName: value.lastName,
        middleName: value.middleName
      }
    }).subscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      middleName: this.fb.control(''),
      username: this.fb.control(''),
      role: this.fb.control('')
    });
  }
  private updateFormFromPerson(person: UserDetails) {
    const formValue: UpdateForm = {
      firstName: person.firstName,
      lastName: person.lastName,
      middleName: person.middleName,
      username: person.username,
      id: person.id,
      role: person.role
    };
    this.form.patchValue(formValue);
  }
}
