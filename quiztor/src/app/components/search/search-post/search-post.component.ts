import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {

  @Input() myPosts;

  constructor() { }

  ngOnInit(): void {
  }

}
