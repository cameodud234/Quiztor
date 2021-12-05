import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  user;

  constructor(private formBuilder : FormBuilder, private service : ServiceService) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      username : new FormControl(''),
      password: new FormControl(''),
      type : new FormControl('')
    })
  }

  addUser() {
    this.service.addUser(this.user.value);
    alert("User Successfully Added");
  }
}
