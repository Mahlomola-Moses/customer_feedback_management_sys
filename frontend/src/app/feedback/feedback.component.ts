import { Component } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedback = { name: '', email: '', message: '' };

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback(): void {
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      () => {
        alert('Feedback submitted successfully');
        this.feedback = { name: '', email: '', message: '' };
      },
      (error) => {
        alert('Failed to submit feedback');
      }
    );
  }
}
