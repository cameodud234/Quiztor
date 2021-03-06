import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginAuthGuardService } from './login-auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostComponent } from './components/post/post.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

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
    path: "search", component: SearchComponent, canActivate: [LoginAuthGuardService]
  },
  {
    path: "search-post", component: SearchComponent, canActivate: [LoginAuthGuardService]
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
  {
    path: "post/:postid", component: PostComponent, canActivate: [LoginAuthGuardService]
  },
  {
    path: "comment/:postid", component: AddCommentComponent, canActivate: [LoginAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
