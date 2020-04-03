import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { AddCommentComponent } from './post-single/comments/comment/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './post-single/comments/comment/comment.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../common/core.module';
import { ReplyComponent } from './post-single/comments/comment/reply/reply.component';
import { DisplayCommentComponent } from './post-single/comments/comment/display-comment/display-comment.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostSingleComponent,
    AddCommentComponent,
    CommentComponent,
    ReplyComponent,
    DisplayCommentComponent
  ],
  imports: [
    PostsRoutingModule,
    FormsModule,
    CommonModule,
    CoreModule
  ]
})
export class PostsModule { }
