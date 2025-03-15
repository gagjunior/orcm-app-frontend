import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, user} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private readonly auth: Auth) {
    this.user$ = user(this.auth);
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async logout() {
    await signOut(this.auth);
  }
}
