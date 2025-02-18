import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  imports: [
    Button,
    IconField,
    InputIcon,
    InputText,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  submitted: boolean = false;

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
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

  samePasswords(): boolean {
    return this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value;
  }

  onSubmit(): void {
    this.submitted = true;
  }

}
