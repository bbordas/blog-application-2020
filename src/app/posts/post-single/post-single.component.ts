import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../common/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, Comment } from '../../common/services/blog.model';
import { CommentService } from '../../common/services/comment.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.less']
})
export class PostSingleComponent implements OnInit {
  @Input() post: BlogPost;
  @Input() comment: Comment;

  comments: Array<Comment>;
  content: string;
  id: number;
  postLevelComments: Array<Comment>;
  childComments: Array<Comment>;
  placeholder = 'Write a comment...';

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private commentService: CommentService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.postService
        .getPostsById(this.id)
        .subscribe(post => {
          this.post = post;
          this.content = post.content;

          this.getCommentsByPostId(post);
        });
    });
  }

  private getCommentsByPostId(post) {
    this.commentService.getCommentsByPostId(this.id).subscribe(comments => {
      this.comments = comments;
      this.postLevelComments = post.getComments(comments, null);
      this.childComments = this.comments.filter((el) => !this.postLevelComments.includes(el));
    });
  }

  onSubmitForm(submitted: boolean) {
    if (submitted) {
      this.ngOnInit();
    }
  }
}
