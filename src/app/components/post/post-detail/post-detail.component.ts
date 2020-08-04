import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  private id: string;
  public post: Post = {};

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private postService: PostService
  ) {
    // Params
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.getPost(this.id);
  }

  getPost = (id: string) => {
    this.postService.get(id).subscribe((response: Post) => {
      this.post = response;
    }, (error: string) => {
      console.log(error);
    });
  }

}
