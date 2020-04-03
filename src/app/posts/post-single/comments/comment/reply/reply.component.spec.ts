import {ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {ReplyComponent} from './reply.component';
import {of} from 'rxjs';
import {CommentService} from '../../../../../common/services/comment.service';
import {setUpTestBed} from '../../../../../../test.common.spec';
import {FormsModule} from '@angular/forms';
import {NativeWindow} from '../../../../../common/services/native-window.service';
import { Comment } from '../../../../../common/services/blog.model';
import {Router} from '@angular/router';
import {PostsModule} from '../../../../posts.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;
  let router: Router;

  const comment = new Comment();
  comment.parent_id = 1;
  comment.user = 'bogi';
  const comment2 = new Comment();
  comment2.parent_id = 20;

  const mockCommentService = {
    getCommentsByPostId: () => {
      return of([comment, comment2]);
    }
  };

  const windowMock = {
    getWindow: () => {
      return {
        location : {
          pathname : 'abc/posts/1'
        }
      };
    }
  };

  const moduleDef: TestModuleMetadata = {
    providers: [
      {
        provide: CommentService, useValue: mockCommentService
      },
      {
        provide: NativeWindow, useValue: windowMock
      }
    ],
    imports: [
      FormsModule,
      PostsModule,
      RouterTestingModule.withRoutes([])
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.commentId = 1;
  });

  it('should create ReplyComponent', () => {
    expect(component instanceof ReplyComponent).toBe(true);
  });

  it('should set postId to 1', () => {
    component.commentId = 1;
    component.ngOnInit();

    expect(component.postId).toEqual(1);
  });

});

