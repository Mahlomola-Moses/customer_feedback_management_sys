import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:35050';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedback`, feedback);
  }
}
