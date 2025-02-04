import { Component } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-manegement.component.html',
  styleUrl: './feedback-manegement.component.css',
})
export class FeedbackManagementComponent {
  records: any[] = [];
  feedback = { name: '', email: '', message: '' };
  currentPage = 1;
  itemsPerPage = 10;
  totalRecords = 0;
  totalPages = 1;
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Feedback Management Component');
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.loadRecords();
    }
  }

  loadRecords(): void {
    this.feedbackService
      .getFeedbacks(this.currentPage, this.itemsPerPage)
      .subscribe(
        (response) => {
          this.records = response.feedbacks;

          this.totalRecords = response.total;
          this.totalPages = response.totalPages;
        },
        (error) => {
          alert('Failed to load records');
        }
      );
  }

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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadRecords();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecords();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecords();
    }
  }
}
