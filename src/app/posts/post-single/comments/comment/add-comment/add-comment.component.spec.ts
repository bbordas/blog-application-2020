import { AddCommentComponent } from './add-comment.component';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommentService } from '../../../../../common/services/comment.service';
import { setUpTestBed } from '../../../../../../test.common.spec';
import { FormsModule } from '@angular/forms';
import { NativeWindow } from '../../../../../common/services/native-window.service';
import { PostsModule } from '../../../../posts.module';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let postSpy: jasmine.Spy;
  let emitSpy: jasmine.Spy;

  const windowMock = {
    getWindow: () => {
      return {
        location : {
          pathname : 'abc/posts/1'
        }
      };
    }
  };

  const mockCommentService = {
    postComments: () => {
      return of( emitSpy );
    }
  };

  const mockEmit = {
    emit: () => {
      return of();
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
      PostsModule
    ],
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    postSpy = spyOn(mockCommentService, 'postComments');
    emitSpy = spyOn(mockEmit, 'emit');
    component = fixture.componentInstance;
  });

  it('should create PostSingleComponent', () => {
    expect(component instanceof AddCommentComponent).toBe(true);

  });

  it('should return 1 for component.postId', () => {
    component.ngOnInit();

    expect(component.postId).toEqual(1);

  });

});
