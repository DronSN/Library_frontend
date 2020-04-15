import { Component } from '@angular/core';
import {BookServiceService} from './services/find-popbook/book-service.service';
import {CurrentUserService} from './core/services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  user$ = this.currentUser.user$.pipe();
  constructor(private currentUser: CurrentUserService) {
  }
}
