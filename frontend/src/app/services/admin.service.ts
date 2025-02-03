import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:35050';

  constructor(private http: HttpClient) {}

  getAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/${id}`);
  }
}
