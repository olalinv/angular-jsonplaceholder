import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { PostDeleteComponent } from './components/post/post-delete/post-delete.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'post',
    children: [
      {
        path: 'add',
        component: PostAddComponent
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: PostDetailComponent
          },
          {
            path: 'edit',
            component: PostEditComponent
          },
          {
            path: 'delete',
            component: PostDeleteComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
