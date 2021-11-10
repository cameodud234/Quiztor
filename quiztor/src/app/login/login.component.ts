import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceService } from "../service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;

  constructor(private formBuilder : FormBuilder, private service : ServiceService) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      username : new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    this.service.login(this.user.value.username, this.user.value.password)
  }
}
