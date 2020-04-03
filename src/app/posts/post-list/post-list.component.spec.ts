import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../common/services/post.service';
import { setUpTestBed } from '../../../test.common.spec';
import { of } from 'rxjs';
import { BlogPost } from '../../common/services/blog.model';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsModule } from '../posts.module';
import {Router} from '@angular/router';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let router: Router;

  const post = new BlogPost();
  const post2 = new BlogPost();
  const post3 = new BlogPost();
  const post4 = new BlogPost();

  const mockPostService = {
    getPostsById: () => {
      return of(post);
    },
    getPosts: () => {
      return of<BlogPost[]>([post, post2, post3, post4]);
    }
  };

  const moduleDef: TestModuleMetadata = {
    providers: [
      {
        provide: PostService, useValue: mockPostService
      }
    ],
    imports: [
      PostsModule,
      RouterTestingModule.withRoutes([])
    ],
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PostListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should list posts', () => {
    component.ngOnInit();

    expect(component.posts).toEqual([post, post2, post3, post4]);
  });

  it('should sort posts by date => newest first', () => {
    post.publish_date = '2020-03-16';
    post2.publish_date = '2010-02-13';
    post3.publish_date = '2020-01-01';
    post4.publish_date = '2019-12-12';
    component.ngOnInit();

    expect(component.sortedPosts).toEqual([post, post3, post4, post2]);
  });
});

