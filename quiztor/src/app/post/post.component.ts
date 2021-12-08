import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private service : ServiceService, private activateRoute : ActivatedRoute) { }

  post = null;
  comments = null;

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.service.getPost(params.postid).subscribe((response : any) => {
        this.post = response;
      })
    })
    this.activateRoute.params.subscribe((params) => {
      this.service.getComments(params.postid).subscribe((response : any) => {
        this.comments = response;
      })
    })
  }

}
