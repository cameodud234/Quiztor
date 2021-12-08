import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  comment;

  constructor(private formBuilder: FormBuilder, private activateRoute : ActivatedRoute, private service : ServiceService) { }

  ngOnInit(): void {
    this.comment = this.formBuilder.group({
      comment : new FormControl('')
    })
  }

  addComment() {
    this.activateRoute.params.subscribe((params) => {
      this.service.addComment(this.comment.value, params.postid)
    })
  }
}
