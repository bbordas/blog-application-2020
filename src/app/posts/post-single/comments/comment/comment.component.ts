import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../../common/services/blog.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {
  @Input() postId: number;
  @Input() comment: Comment;
  @Input() comments: Array<Comment>;
  @Input() parentId: number;

  @Output() onSubmit = new EventEmitter<boolean>();
  @Output() onReply = new EventEmitter<Comment>();

  showReply = false;
  numberOfComments = 0;
  commentLevelComments: Array<Comment>;
  childLevelComments: Array<Comment>;
  commentId: number;
  placeholder = 'Write a reply...';
  replies = 0;
  replyTo: Comment;

  constructor() { }

  ngOnInit(): void {
      this.commentLevelComments = this.comment.getChildComments(this.comments, this.comment.id);
      this.childLevelComments = this.comments
        .filter(el => {
          this.commentLevelComments.includes(el);
        });
      this.numberOfComments = this.calculateReplyNums(this.comment);
  }

  getCommentId(id) {
    this.commentId = id;
  }

  calculateReplyNums(comment: Comment): number {
    this.comments.forEach(com => {
      if (comment.id === com.parent_id) {
        this.replies++;
        this.calculateReplyNums(com);
      }
    });
    return this.replies;
  }

  onSwitchState(switched: boolean) {
    if (switched) {
      this.showReply = !this.showReply;
    }
  }

  onSubmitForm(submitted: boolean) {
    this.onSubmit.emit(submitted);
    this.ngOnInit();
  }

  onSendReply(comment: Comment) {
    this.replyTo = comment;
  }
}
