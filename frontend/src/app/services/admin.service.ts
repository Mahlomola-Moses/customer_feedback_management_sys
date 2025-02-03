import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:35050/admin';

  constructor(private http: HttpClient) {}
  createAdmin(feedback: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, feedback);
  }

  getAdmin(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
