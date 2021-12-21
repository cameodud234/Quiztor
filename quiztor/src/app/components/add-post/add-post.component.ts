import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post;
  selectedFile = null;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.post = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      meme : new FormControl(null)
    })
  }

  onFileChange(event) {
    console.log(event.target.files)
    this.selectedFile = event.target.files[0]
  }

  addPost() {
    const fd = new FormData();
    fd.append("meme", this.selectedFile);
    this.service.addPost(this.post.value, fd);
  }

}