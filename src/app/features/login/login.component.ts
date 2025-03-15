import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    IconField,
    InputIcon,
    InputText,
    Button,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly router: Router = inject(Router);
  private readonly authService = inject(AuthService);

  submitted: boolean = false;

  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  )

  login() {
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
    .then(user => console.log('Usuário logado:', user))
    .catch(error => console.error('Erro no login:', error));
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.submitted = true;
    this.login();
  }
}
