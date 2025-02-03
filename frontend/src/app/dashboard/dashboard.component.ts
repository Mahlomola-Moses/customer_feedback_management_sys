import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  records: any[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecords();
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
