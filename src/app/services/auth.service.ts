import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  guestLogin() {
    return this.login('guest@timely.com', 'guest123');
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}