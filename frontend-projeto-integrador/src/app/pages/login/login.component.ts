import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    this.usuarioService.verificarUsuario(this.username, this.password).subscribe(
      (valid) => {
        if (valid) {
          // this.router.navigate(['/perfil'], { queryParams: { username: this.username } });
          window.location.href = `http://127.0.0.1:5500/frontend-vanilla/post-pages/post-page.html?username=${this.username}`;
        } else {
          this.errorMessage = 'Usuário ou senha incorretos!';
        }
      },
      () => {
        this.errorMessage = 'Erro ao conectar com o servidor!';
      }
    );
  }

  toCadastro(){
    this.router.navigate(['?username=victor123']);
  }
}