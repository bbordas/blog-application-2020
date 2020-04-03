import {async, fakeAsync, TestBed} from '@angular/core/testing';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { BlogPost } from './blog.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PostService', () => {
  let service: PostService;
  let http: HttpTestingController;

  const post = new BlogPost();
  const post2 = new BlogPost();

  const mockPostService = {
    getPostsById: () => {
      return of(post);
    },
    getPosts: () => {
      return of([post, post2]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PostService, useValue: mockPostService
        }
      ],
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return single post',  fakeAsync( () => {
    service.getPostsById(1).subscribe( c => {
      expect(c).toEqual(post);
    });
  }));

  it('should return post array',  fakeAsync( () => {
    service.getPosts().subscribe( c => {
      expect(c).toEqual([post, post2]);
    });
  }));
});
