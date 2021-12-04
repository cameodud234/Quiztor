import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin: String;
  posts;

  @Input() isSearchPressed: Boolean;

  constructor() { }

  ngOnInit(): void {
    this.admin = window.sessionStorage.getItem("admin");
  }

  logout() {
    sessionStorage.clear();
  }

  emitPosts(myPosts){
    this.posts = myPosts;
  }

}
