import {DisplayCommentComponent} from './display-comment.component';
import {ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {CommentService} from '../../../../../common/services/comment.service';
import {setUpTestBed} from '../../../../../../test.common.spec';
import {Comment} from '../../../../../common/services/blog.model';
import {of} from 'rxjs';

describe('DisplayCommentComponent', () => {
  let component: DisplayCommentComponent;
  let fixture: ComponentFixture<DisplayCommentComponent>;

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
        provide: CommentService, useValue: mockCommentService
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PostSingleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should devide content to name and content if content starts with @', () => {
    component.content = '@Bogi hello';

    component.divideNameAndContent();

    expect(component.name).toEqual('@Bogi');
    expect(component.content).toEqual('hello');
  });

  it('should NOT devide content to name and content if content DOESNT start with @', () => {
    component.content = 'Bogi @hello';

    component.divideNameAndContent();

    expect(component.name).not.toEqual('Bogi');
    expect(component.content).toEqual('Bogi @hello');
  });

});

