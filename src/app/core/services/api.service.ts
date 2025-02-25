import {inject} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class ApiService {

  protected http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor(protected readonly endpoint: string) {
  }

  post<T>(data: any, path: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint}/${path}`, data);
  }

  get<T>(): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.endpoint}`);
  }

  put<T>(id: number, data: any, path: string): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.endpoint}/${path}/${id}`, data);
  }

  delete<T>(id: number, path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.endpoint}/${path}/${id}`);
  }

}
