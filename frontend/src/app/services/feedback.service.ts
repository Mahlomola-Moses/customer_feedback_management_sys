import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:35050/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, feedback);
  }

  getFeedbacks(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }
}
