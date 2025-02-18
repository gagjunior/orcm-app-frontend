import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-register',
  imports: [
    Button,
    IconField,
    InputIcon,
    InputText,
    NgIf,
    ReactiveFormsModule,
    Dialog
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  submitted: boolean = false;
  visibleErrorDialog: boolean = false;

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {validators: this.passwordMatchValidator()}
  );

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return {passwordMismatch: true};
      }
      return null;
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.registerForm.valid) {
      this.visibleErrorDialog = true;
      return;
    }
    window.alert('Registro enviado')
  }

}
