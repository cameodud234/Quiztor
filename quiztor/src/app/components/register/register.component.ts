import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user;

  constructor(private formBuilder : FormBuilder, private service : ServiceService) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      username : new FormControl(''),
      password: new FormControl('')
    })
  }

  register() {
    this.service.registerUser(this.user.value)
  }

}
