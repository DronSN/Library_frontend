import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PopularBookComponent } from './popular-book/popular-book.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { BookSearchComponent } from './core/components/book-search/book-search.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {LOAD_CURRENT_USER_INITIALIZER} from './core/services/current-user.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SignupComponent } from './core/components/user-menu/modal-dialogs/signup/signup.component';
import { LoginComponent } from './core/components/user-menu/modal-dialogs/login/login.component';
import {UserMenuComponent} from './core/components/user-menu/user-menu.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegularUserMenuComponent } from './core/components/user-menu/regular-user-menu/regular-user-menu.component';
import { AdminUserMenuComponent } from './core/components/user-menu/admin-user-menu/admin-user-menu.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminBooksComponent } from './pages/admin-books/admin-books.component';
import { BooksNotLoginComponent } from './pages/books-not-login/books-not-login.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularBookComponent,
    BookSearchComponent,
    UserMenuComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    UserProfileComponent,
    HomePageComponent,
    RegularUserMenuComponent,
    AdminUserMenuComponent,
    AdminDashboardComponent,
    AdminBooksComponent,
    BooksNotLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  // entryComponents: [DialogOverviewExample, DialogOverviewExampleDialog],
  providers: [LOAD_CURRENT_USER_INITIALIZER,
              { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
