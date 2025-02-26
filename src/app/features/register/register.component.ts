import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Dialog} from 'primeng/dialog';
import {Panel} from 'primeng/panel';
import {UserRegistrationService} from '../../core/services/user-registration.service';
import {UserDto} from '../../core/models/user/user-dto';
import {ApiError} from '../../core/models/api-error';
import {Utils} from '../../core/utils/utils';
import {Router} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-register',
  imports: [
    Button,
    IconField,
    InputIcon,
    InputText,
    NgIf,
    ReactiveFormsModule,
    Dialog,
    Panel,
    ProgressSpinner
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly userService: UserRegistrationService = inject(UserRegistrationService);
  private readonly router = inject(Router);

  submitted: boolean = false;
  visibleErrorDialog: boolean = false;
  visibleSucessDialog: boolean = false;
  visibleValidatorDialog: boolean = false;
  loading: boolean = false;
  newUser: UserDto | undefined;

  apiError: ApiError = {
    status: 0,
    message: ''
  };

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    return value.trim().length === 0 ? {whitespace: true} : null;
  }


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

  createUserRegistration(): UserDto {
    return {
      email: this.registerForm.value.email?.toLowerCase() ?? '',
      password: this.registerForm.value.password ?? '',
      fullName: Utils.capitalizeWords(this.registerForm.value.fullName ?? ''),
      phoneNumber: '',
      displayName: '',
      photoUrl: '',
      disabled: false
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }


  onSubmit(): void {
    this.submitted = true;

    if (!this.registerForm.valid) {
      this.visibleValidatorDialog = true;
      return;
    }

    this.loading = true;
    this.newUser = this.createUserRegistration();

    this.userService.createUser(this.newUser).subscribe({
        next: (value) => {
          this.visibleSucessDialog = true;
          this.registerForm.reset();
          this.submitted = false;
          this.loading = false;

        },
        error: (error) => {
          this.visibleErrorDialog = true;
          this.apiError.status = error.status;
          this.apiError.message = error.error.message;
          this.loading = false;
        }
      }
    );

  }

}
