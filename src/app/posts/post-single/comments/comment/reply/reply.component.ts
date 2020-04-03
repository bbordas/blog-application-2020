import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from '../../../../../common/services/blog.model';
import { CommentService } from '../../../../../common/services/comment.service';
import { NativeWindow } from '../../../../../common/services/native-window.service';

@Component({
  selector: 'app-child-comment',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.less']
})
export class ReplyComponent implements OnInit {
  @Input() comment: Comment;
  @Input() comments: Array<Comment>;
  @Input() postId: number;
  @Input() parentId: number;
  @Input() commentId: number;
  @Input() parentUser: string;

  @Output() onReply = new EventEmitter<Comment>();

  replies: Comment[];

  constructor(private commentService: CommentService,
              private window: NativeWindow) {

    this.postId = this.getPostId();

    this.commentService.getCommentsByPostId(this.postId)
      .subscribe(comments => {
        this.replies = comments.filter(comment => comment.parent_id === this.commentId);
      });
  }

  ngOnInit(): void {}

  private getPostId() {
    return Number((this.window.getWindow().location.pathname).split('/')[2]);
  }

  onSendReply(comment: Comment) {
    this.onReply.emit(comment);
  }
}


