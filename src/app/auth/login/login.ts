import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.storeToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe incorrect';
        this.loading = false;
      },
    });
  }

  forgotPassword() {
    console.log('ok');
    const email = this.loginForm.get('login')?.value;

    if (!email) {
      this.errorMessage = 'Veuillez saisir votre email';
      return;
    }

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('Email de réinitialisation envoyé ✅');
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la demande';
      },
    });
  }
}
