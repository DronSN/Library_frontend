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
import { BookSearchComponent } from './book-search/book-search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import { UserMenuComponent } from './core/components/user-menu/user-menu.component';
import {LOAD_CURRENT_USER_INITIALIZER} from './core/services/current-user.service';

@NgModule({
  declarations: [
    AppComponent,
    PopularBookComponent,
    BookSearchComponent,
    UserMenuComponent
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
        ReactiveFormsModule
    ],
  providers: [LOAD_CURRENT_USER_INITIALIZER],
  bootstrap: [AppComponent]
})
export class AppModule { }
