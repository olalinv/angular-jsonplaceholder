import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { FormHelper } from 'src/app/helpers/form.helper';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {

  @Input() id: string;

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  public post: Post = {};
  public editorPostForm: FormGroup;
  public controlsConfig: object = {};
  public isSubmitted = false;

  constructor(
    private ngZone: NgZone,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {
    this.initEditorPostForm();
  }

  get form(): any { return this.editorPostForm.controls; }

  ngOnInit(): void {
    if (this.id) {
      this.getPost(this.id);
    }
  }

  getPost = (id: string) => {
    this.postService.get(id).subscribe((response: Post) => {
      this.post = response;
      this.fillEditorPostForm();
    }, (error: string) => {
      console.log(error);
    });
  }

  savePost = (post: Post) => {
    this.postService.save(post).subscribe(() => {
      this.snackBar.open(`Se añadió la entrada ${post.title}`, 'Cerrar');
      this.router.navigateByUrl('/');
    }, (error: string) => {
      console.log(error);
    });
  }

  preparePost = (values: object) => {
    Object.assign(this.post, values);
  }

  initEditorPostForm = () => {
    this.controlsConfig = {
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    };
    this.editorPostForm = this.formBuilder.group(this.controlsConfig);
  }

  fillEditorPostForm = () => {
    this.editorPostForm.controls.title.setValue(this.post.title);
    this.editorPostForm.controls.body.setValue(this.post.body);
  }

  onSubmitEditorPostForm = () => {
    this.isSubmitted = true;
    if (this.editorPostForm.invalid) {
      return;
    }
    this.preparePost(this.editorPostForm.value);
    this.savePost(this.post);
  }

  triggerResize = () => {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getErrorMessage = (errorName: string) => {
    return FormHelper.getErrorMessage(errorName);
  }

}
