import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private apiService: ApiService) { }

  query = (): Observable<Post[]> => {
    return this.apiService.get(this.apiUrl, new HttpParams({ fromObject: {} }));
  }

  get = (postId: string): Observable<Post> => {
    return this.apiService.get(`${this.apiUrl}/${postId}`, new HttpParams({ fromObject: {} }));
  }

  save = (post: Post): Observable<Post> => {
    if (post.id) {
      return this.apiService.put(`${this.apiUrl}/${post.id}`, post);
    } else {
      return this.apiService.post(`${this.apiUrl}`, post);
    }
  }

  delete = (postId: string): Observable<Post> => {
    return this.apiService.delete(`${this.apiUrl}/${postId}`);
  }

}
