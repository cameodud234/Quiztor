import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginAuthGuardService } from './login-auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path : "", component: LoginComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "addUser", component: AddUserComponent, canActivate: [LoginAuthGuardService, AdminAuthGuardService]
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [LoginAuthGuardService]
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "userList", component: UserListComponent, canActivate: [LoginAuthGuardService, AdminAuthGuardService]
  },
  {
    path: "addPost", component: AddPostComponent, canActivate: [LoginAuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
