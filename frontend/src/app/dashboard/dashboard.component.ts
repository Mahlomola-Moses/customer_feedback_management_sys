import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  records: any[] = [];
  showModal = false;
  newRecord = { name: '', lastname: '', email: '', password: '' };

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.loadRecords();
    }
  }

  loadRecords(): void {
    this.adminService.getAdmin().subscribe(
      (response) => {
        this.records = response.admins;
      },
      (error) => {
        alert('Failed to load records');
      }
    );
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newRecord = { name: '', lastname: '', email: '', password: '' }; // Reset form
  }

  addRecord(): void {
    this.adminService.createAdmin(this.newRecord).subscribe(
      () => {
        this.loadRecords();
        this.closeModal();
      },
      (error) => {
        alert('Failed to add record');
      }
    );
  }

  deleteRecord(id: number): void {
    this.adminService.deleteAdmin(id).subscribe(
      () => {
        this.loadRecords();
      },
      (error) => {
        alert('Failed to delete record');
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
