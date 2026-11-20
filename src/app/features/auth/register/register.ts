import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormField,
  email,
  form,
  maxLength,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RegisterFormData } from './register.model';

@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  private data = signal<RegisterFormData>({ email: '', password: '', confirmPassword: '' });
  protected error = signal('');

  protected registerForm = form(this.data, (f) => {
    required(f.email, { message: "L'email est obligatoire." });
    email(f.email, { message: 'Adresse email invalide.' });
    required(f.password, { message: 'Le mot de passe est obligatoire.' });
    minLength(f.password, 8, { message: 'Au moins 8 caractères.' });
    maxLength(f.password, 72, { message: '72 caractères maximum.' });
    validate(f.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(f.password)
        ? { kind: 'mismatch', message: 'Les mots de passe ne correspondent pas.' }
        : undefined,
    );
  });

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.error.set('');

    await submit(this.registerForm, async () => {
      const { email, password } = this.registerForm().value();
      try {
        await firstValueFrom(this.authService.register({ email: email.trim(), password }));
        await this.router.navigate(['/']);
      } catch (err) {
        this.error.set(errorMessage(err));
      }
      return undefined;
    });

    this.registerForm().errorSummary()[0]?.fieldTree().focusBoundControl();
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse && err.status === 0) return 'Serveur injoignable.';
  if (err instanceof HttpErrorResponse && err.status === 409) return 'Cet email est déjà utilisé.';
  return 'Inscription impossible.';
}
