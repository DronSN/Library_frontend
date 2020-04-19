import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {UserProfileComponent} from './core/components/user-profile/user-profile.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: UserProfileComponent }
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
