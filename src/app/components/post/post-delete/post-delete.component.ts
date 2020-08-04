import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  private id: string;
  public post: Post = {};

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
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

  deletePost = () => {
    this.postService.delete(this.id).subscribe(() => {
      this.snackBar.open(`Se eliminó la entrada ${this.id}`, 'Cerrar');
      this.router.navigateByUrl('/');
    }, (error: string) => {
      console.log(error);
    });
  }

}
