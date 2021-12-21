import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-search-get',
  templateUrl: './search-get.component.html',
  styleUrls: ['./search-get.component.css']
})
export class SearchGetComponent implements OnInit {

  @Input() posts;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }

}
