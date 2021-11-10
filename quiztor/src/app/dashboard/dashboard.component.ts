import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products;

  constructor(private http : HttpClient, private service : ServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe(response => {
      this.products = response
    })
  }

}
