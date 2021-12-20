import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { emit } from 'process';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-search-get',
  templateUrl: './search-get.component.html',
  styleUrls: ['./search-get.component.css']
})
export class SearchGetComponent implements OnInit {

  post;
  @Output() postBroadcast = new EventEmitter();
  selectedFile = null;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.post = this.formBuilder.group({
      text: new FormControl(''),
      meme : new FormControl(null)
    })
  }

  onFileChange(event) {
    console.log(event.target.files)
    this.selectedFile = event.target.files[0]
  }

  showPosts() {
    const fd = new FormData();
    fd.append("meme", this.selectedFile);
    this.service.getPostsSearch(this.post.value, fd).subscribe((res) => {
      this.post = res;
      this.postBroadcast.emit(res);
    });
  }

}
