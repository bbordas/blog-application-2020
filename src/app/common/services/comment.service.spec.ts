import {async, fakeAsync, TestBed} from '@angular/core/testing';
import { CommentService } from './comment.service';
import { of } from 'rxjs';
import { Comment } from './blog.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CommentService', () => {
  let service: CommentService;
  let http: HttpTestingController;

  const comment = new Comment();

  const mockCommentService = {
    getComment: () => {
      return of(comment);
    },
    getCommentsByPostId: () => {
      return of([comment, comment]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CommentService, useValue: mockCommentService
        }
      ],
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return comment',  fakeAsync( () => {
    service.getComment(1).subscribe( c => {
      expect(c).toEqual(comment);
    });
  }));

  it('should return comment array',  fakeAsync( () => {
    service.getCommentsByPostId(1).subscribe( c => {
      expect(c).toEqual([comment, comment]);
    });
  }));
});
