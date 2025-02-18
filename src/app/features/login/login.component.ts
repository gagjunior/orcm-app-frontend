import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private readonly router: Router) {
  }

  submitted: boolean = false;

  loginForm = new FormGroup(
    {
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  )

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.submitted = true;
  }
}
