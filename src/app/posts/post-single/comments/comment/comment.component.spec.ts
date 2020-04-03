import {async, ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { setUpTestBed } from '../../../../../test.common.spec';
import { Comment } from '../../../../common/services/blog.model';

describe('CommentComponent', () => {
  let fixture: ComponentFixture<CommentComponent>;
  let component: CommentComponent;

  const comment1 = new Comment();
  comment1.id = 1;
  comment1.user = 'e';
  comment1.date = 'e';
  comment1.parent_id = null;
  const comment2 = new Comment();
  comment2.id = 2;
  comment2.user = 'e';
  comment2.user = 'date';
  comment2.parent_id = 1;
  const comment3 = new Comment();
  comment3.id = 3;
  comment3.user = 'e';
  comment3.user = 'date';
  comment3.parent_id = 1;

  const mockComment = {
    getChildComments: () => {
      return [ comment1, comment2, comment3];
    }
  };

  const moduleDef: TestModuleMetadata = {
    declarations: [CommentComponent],
    providers: [
      {
        provide: Comment, useValue: mockComment
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create CommentComponent', async (() => {
    expect(component).toBeTruthy();
  }));

  it('should calculate reply nums and return 2', async (() => {
    component.comments = [comment1, comment2, comment3];

    expect(component.calculateReplyNums(comment1)).toEqual(2);
  }));

});
