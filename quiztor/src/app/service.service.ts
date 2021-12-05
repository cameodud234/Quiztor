import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  body;

  constructor(private http : HttpClient, private router : Router) { }

  login(username, password) {
    return this.http.post("http://localhost:3000/login", {
      username,
      password
    }).subscribe((response : any) => {
      if (response.token == undefined) {
        alert("Login Incorrect")
        this.router.navigate(["/login"])
      } else {
        window.sessionStorage.setItem("token", response.token)
        window.sessionStorage.setItem("admin", response.admin)
        this.router.navigate(["/dashboard"])
      }  
    })
  }

  getPosts() {
    return this.http.get("http://localhost:3000/posts", {
      headers : {
        "authorization" : window.sessionStorage.getItem('token') || ""
      }
    })
  }

  getPostsSearch(value) {
    this.body = {
      searchText : value
    }
    console.log(this.body.searchText);
    return this.http.get("http://localhost:3000/showQuery", {
      headers : { "authorization" : window.sessionStorage.getItem('token') || ""},
      params: this.body,
      responseType: "json"
    });
  }

  addPost(formValues, fd) {
    this.body = {
      label : "placeholder",
      meme_text : "placeholder",
      description : formValues.description,
      title : formValues.title,
    }

    return this.http.post("http://localhost:3000/posts/", fd, {
      headers : {
        "authorization" : window.sessionStorage.getItem('token') || ""
      },
      params : this.body
    }).subscribe(res => {
      this.router.navigate(["/dashboard"])
    });
  }

  registerUser(formValues) {
    this.body = {
      username : formValues.username,
      password : formValues.password,
      admin : false
    }

    this.router.navigate(["/login"])
    return this.http.post("http://localhost:3000/nonadmin_users", this.body).subscribe()
  }

  getUsers() {
    return this.http.get("http://localhost:3000/users", {
      headers : {
        "authorization" : window.sessionStorage.getItem('token') || ""
      }
    })
  }

  addUser(formValues) {
    this.body = {
      username : formValues.username,
      password : formValues.password,
      admin : formValues.type
    }


    this.router.navigate(["/userList"])
    return this.http.post("http://localhost:3000/users", this.body, {
      headers : {
        "authorization" : window.sessionStorage.getItem('token') || ""
      }
    }).subscribe()
  }
}