import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  template: `
    <input #box (keyup.enter)="onEnter(box.searchText)">
    <p>{{searchText}}</p>
  `,
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchText: String = '';
  @Output() postOutPut = new EventEmitter();

  constructor(private http : HttpClient, private service : ServiceService) { }

  ngOnInit(): void {
  }

  // onKey(searchText: String) {
  //   this.searchTexts += searchText + ' | ';
  //   console.log(searchText);
  // }

  onEnter(searchText: string) {  
    if(searchText != "") {
      this.searchText = searchText;
      this.getPosts();
    }
    else if(searchText == "") console.error("User must enter a search keyword");
  }

  getPosts() {
    this.service.getPostsSearch(this.searchText).subscribe(response => {
      this.postOutPut.emit(response);
    });
  }

}