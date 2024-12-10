import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'users',
    component:UsersComponent,
    pathMatch:'full'
  },
  {
    path:'new',
    component:NewUserComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
