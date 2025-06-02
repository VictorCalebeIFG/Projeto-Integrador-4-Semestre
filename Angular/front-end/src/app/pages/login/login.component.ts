import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  erroLogin = false;

  constructor(private http: HttpClient, private router: Router) {}

  fazerLogin() {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    this.http.post<boolean>('http://localhost:8080/usuarios/verificar', params)
      .subscribe({
        next: (valido) => {
          if (valido) {
            localStorage.setItem('usuarioLogado', this.username);
            
            this.router.navigate(['/feed'], {
              state: { username: this.username }
            });
          } else {
            this.erroLogin = true;
          }
        },
        error: () => {
          this.erroLogin = true;
        }
      });
  }
}
