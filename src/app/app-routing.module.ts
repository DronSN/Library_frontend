import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {UserProfileComponent} from './core/components/user-profile/user-profile.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import {AdminBooksComponent} from './pages/admin-books/admin-books.component';
import {BooksNotLoginComponent} from './pages/books-not-login/books-not-login.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'adminbooks', component: AdminBooksComponent },
  { path: 'booksnotloginlist', component: BooksNotLoginComponent, runGuardsAndResolvers: 'always' }
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/home-pages/home-pages.module').then(m => m.HomePagesModule),
  //   data: {
  //     title: 'Home'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
