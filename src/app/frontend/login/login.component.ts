import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  onLogin() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }
    this.isLoading = true;
    this.authService.login(this.email, this.password)
      .then(() => this.router.navigateByUrl('/homescreen'))
      .catch(() => this.errorMessage = 'Email or password is incorrect.')
      .finally(() => this.isLoading = false);
  }

  guestLogin() {
    this.isLoading = true;
    this.authService.guestLogin()
      .then(() => this.router.navigateByUrl('/homescreen'))
      .catch(() => this.errorMessage = 'Guest login failed.')
      .finally(() => this.isLoading = false);
  }
}
