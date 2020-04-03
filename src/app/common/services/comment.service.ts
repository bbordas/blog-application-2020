import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './blog.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostComment } from './blog.api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = 'http://localhost:9001/';

  constructor(private http: HttpClient) {}

  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.url}comments/${id}`).pipe(
      map(data => new Comment().deserialize(data)),
        catchError(() => throwError('Comment not found')));
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}posts/${postId}/comments`).pipe(
      map(data => data.map(d => new Comment().deserialize(d)))
      );
  }

  postComments(newComment: PostComment, postId: number): Observable<any> {
    return this.http.post(`${this.url}posts/${postId}/comments`, newComment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
