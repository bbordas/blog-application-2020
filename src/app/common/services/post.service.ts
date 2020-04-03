import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BlogPost } from './blog.model';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class PostService {
  private url = 'http://localhost:9001/posts/';

  constructor(private http: HttpClient) {}

  getPostsById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.url}${id}`).pipe(
      map(data => new BlogPost().deserialize(data)),
      catchError(() => throwError('Post not found')));
  }

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.url}`).pipe(
      map(data => data.map(data => new BlogPost().deserialize(data)))
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
