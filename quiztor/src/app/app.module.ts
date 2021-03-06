import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';
import { SearchComponent } from './components/search/search.component';
import { PostComponent } from './components/post/post.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { SearchGetComponent } from './components/search/search-get/search-get.component';
import { SearchPostComponent } from './components/search/search-post/search-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AddUserComponent,
    UserListComponent,
    NavbarComponent,
    AddPostComponent,
    DragDropFileUploadDirective,
    SearchComponent,
    PostComponent,
    AddCommentComponent,
    SearchGetComponent,
    SearchPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
