
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Input() posts;

  constructor(private http : HttpClient, private service : ServiceService) { }

  ngOnInit(): void {
  }

}