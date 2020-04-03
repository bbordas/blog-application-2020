import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommentService } from '../../../../../common/services/comment.service';
import { PostComment } from '../../../../../common/services/blog.api';
import * as moment from 'moment';
import { NativeWindow } from '../../../../../common/services/native-window.service';
import { NgForm } from '@angular/forms';
import { Comment } from '../../../../../common/services/blog.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.less']
})
export class AddCommentComponent implements OnInit {

  @Input() parentId: number;
  @Input() showAddComment: boolean;
  @Input() commentId: number;
  @Input() placeholderText: string;
  @Input() replyTo: Comment;

  @Output() onSubmit = new EventEmitter<boolean>();

  @ViewChild('publishForm', {static: false}) publishForm: NgForm;

  user: string;
  content: string;
  postId: number;

  constructor( private commentService: CommentService,
               private window: NativeWindow) {}

  ngOnInit(): void {
    this.postId = this.getPostId();
  }

  submitForm() {
    let parentId = null;

    if (this.replyTo) {
      parentId = this.replyTo.id;
    }
    const newComment: PostComment = {
      parent_id: parentId,
      user: this.user,
      date: this.getDate(),
      content: this.content
    };

    this.postComment(newComment);
  }

  postComment(newComment: PostComment) {
    this.commentService.postComments(newComment, this.postId)
      .subscribe((res: any) => {
          this.onSubmit.emit(true);
          this.publishForm.resetForm();
        },
        (error) => {
          error.log('Comment NOT sent' + error);
        });
  }

  private getDate() {
    return moment().format('YYYY-MM-DD');
  }

  private getPostId() {
    return Number((this.window.getWindow().location.pathname).split('/')[2]);
  }
}
