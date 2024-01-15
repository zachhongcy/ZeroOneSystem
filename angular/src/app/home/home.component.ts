import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {
    if (!this.hasLoggedIn) {
      this.authService.navigateToLogin();
    }
  }

  login() {
    this.authService.navigateToLogin();
  }
}
