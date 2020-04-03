import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { CommentComponent } from './post-single/comments/comment/comment.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: ':id', component: PostSingleComponent },
  { path: ':id/comments', component: CommentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
