import { Component, OnInit } from '@angular/core';
import { PostService } from '../../common/services/post.service';
import { BlogPost } from '../../common/services/blog.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit {

  posts: Array<BlogPost>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe( posts => this.posts = posts);
  }

  public get sortedPosts() {
    return this.posts.sort((val1, val2) => {
      return (new Date(val2.publish_date) as any) - (new Date(val1.publish_date) as any);
    });
  }
}
