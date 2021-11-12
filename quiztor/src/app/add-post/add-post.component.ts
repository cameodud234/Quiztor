import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post;
  fileToUpload: File | null = null;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.post = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  addPost() {
    this.service.addPost(this.post.value);
    alert("Post Successfully Added")
  }

}
