import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { PostSingleComponent } from './post-single.component';
import { PostService } from '../../common/services/post.service';
import { setUpTestBed } from '../../../test.common.spec';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../common/services/comment.service';
import { of } from 'rxjs';
import {BlogPost, Comment} from '../../common/services/blog.model';

describe('PostSingleComponent', () => {
  let component: PostSingleComponent;
  let fixture: ComponentFixture<PostSingleComponent>;

  const post = new BlogPost();
  post.content = 'blablabla';
  const post2 = new BlogPost();

  const mockPostService = {
    getPostsById: () => {
      return of(post);
    },
    getPosts: () => {
      return of([post, post2]);
    }
  };

  const comment = new Comment();
  const comment2 = new Comment();

  const mockCommentService = {
    getComment: () => {
      return of(comment);
    },
    getCommentsByPostId: () => {
      return of([comment, comment2]);
    }
  };

  const moduleDef: TestModuleMetadata = {
    providers: [
      {
        provide: PostService, useValue: mockPostService
      },
      {
        provide: ActivatedRoute, useValue: {
          params: of({id: 1})
        }
      },
      {
        provide: CommentService, useValue: mockCommentService
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PostSingleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should get post and comments and set up component correctly on init', () => {
    comment.parent_id = 1;
    comment2.parent_id = null;

    component.ngOnInit();

    expect(component.id).toEqual(1);
    expect(component.post).toEqual(post);
    expect(component.content).toEqual('blablabla');
    expect(component.comments).toEqual([comment, comment2]);
    expect(component.postLevelComments).toEqual([comment2]);
    expect(component.childComments).toEqual([comment]);
  });
});
