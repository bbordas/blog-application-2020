import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../../../common/services/blog.model';
import {CommentService} from '../../../../../common/services/comment.service';

@Component({
  selector: 'app-display-comment',
  templateUrl: './display-comment.component.html',
  styleUrls: ['./display-comment.component.less']
})
export class DisplayCommentComponent implements OnInit {

  @Input() user: string;
  @Input() date: string;
  @Input() content: string;
  @Input() parentUser: string;
  @Input() numberOfComments: number;
  @Input() commentId: number;
  @Input() parentId: number;

  @Output() onStateChange = new EventEmitter<boolean>();
  @Output() onReply = new EventEmitter<Comment>();

  showReply = false;
  comment: Comment;
  name: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.getComment(this.commentId).subscribe( comment => {
      this.comment = comment;
    });
    if (this.content) {
      this.divideNameAndContent();
    }
  }

  onSwitchState(switched: boolean) {
    this.onStateChange.emit(switched);
    this.onReply.emit(this.comment);
  }

  divideNameAndContent() {
    if (this.content[0].includes('@')) {
      this.name = this.content.split(' ')[0];
      this.content = this.content.split(' ')[1];
    }

  }
}
