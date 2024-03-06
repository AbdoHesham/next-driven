import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-alert',
  templateUrl: './inactive-alert.component.html',
  styleUrls: ['./inactive-alert.component.scss'],
})
export class InactiveAlertComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<InactiveAlertComponent>,
    private router: Router
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {}
  goToLogin() {
    this.router.navigate(['sales/pos/auth/login']);
    localStorage.setItem('posLogin', JSON.stringify(false));
  }
}
