import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {UserProfileComponent} from './core/components/user-profile/user-profile.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent }
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
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
