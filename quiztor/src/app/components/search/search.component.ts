import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchVal;
  isSearchPressed: boolean = false;
  // isLoaded: boolean = false;
  selectedFile = null;
  posts;

  constructor(private http : HttpClient, private formBuilder: FormBuilder, private service : ServiceService) { }

  ngOnInit(): void {
    this.searchVal = this.formBuilder.group({
      text: new FormControl(''),
      meme : new FormControl(null)
    })
  }

  onFileChange(event) {
    console.log(event.target.files);
    this.selectedFile = event.target.files[0];
  }

  onClick() {
    this.isSearchPressed = false;
  }

  showPosts() {
    if(this.searchVal.value.text == "") throw new Error("Can not search empty string.");
    this.isSearchPressed = true;
    const fd = new FormData();
    fd.append("meme", this.selectedFile);
    this.service.getPostsSearch(this.searchVal.value, null)
      .subscribe((res) => {
        this.posts = res;
        console.log(res)
      }
    )
  }

}