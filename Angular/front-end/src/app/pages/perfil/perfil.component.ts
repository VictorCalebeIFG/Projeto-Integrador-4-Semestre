import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuarioLogado: string = '';
  postsUsuario: any[] = [];
  user: any = null;
  username: string | null = null;
  novaSenha: string = '';
  mensagem: string = '';

  constructor(private router: Router, private http: HttpClient) {
    console.log('PerfilComponent inicializado');
    const nav = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    const usuarioSalvoStr = localStorage.getItem('usuarioLogado');
    if (usuarioSalvoStr) {
      this.usuarioLogado = usuarioSalvoStr;
      this.carregarPostsDoUsuario();
      this.carregarUsuario(this.usuarioLogado);
    } else {
      console.warn('Usuário não encontrado no localStorage');
    }
  }

  carregarPostsDoUsuario(): void {
    this.http.get<any[]>(`http://localhost:8080/posts/usuario/${this.usuarioLogado}`)
      .subscribe({
        next: posts => {
          this.postsUsuario = posts.map(post => ({
            ...post,
            imageUrl: post.imagepath ? 'data:image/jpeg;base64,' + post.imagepath : null,
          }));
        },
        error: err => console.error('Erro ao carregar posts do usuário', err)
      });
  }

  deletarPost(id: number): void {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      this.http.delete(`http://localhost:8080/posts/${id}`).subscribe({
        next: () => {
          this.postsUsuario = this.postsUsuario.filter(p => p.id !== id);
        },
        error: err => console.error('Erro ao deletar post', err)
      });
    }
  }

  carregarUsuario(post: any) {

    this.http.get<any>(`http://localhost:8080/usuarios/${this.usuarioLogado}`).subscribe({
      next: (usuario) => {
        this.user = usuario;
        console.log(`Dados do usuário ${this.username} carregados`, usuario);
      },
      error: err => console.error(`Erro ao carregar dados do usuário ${this.username}`, err)
    });
  }

  

  alterarSenha(): void {
    const body = new URLSearchParams();
    body.set('username', this.usuarioLogado);
    body.set('novaSenha', this.novaSenha);

    this.http.put('http://localhost:8080/usuarios/atualizar-senha', body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text'  // <-- AVISA que o retorno será texto, não JSON
    }).subscribe({
      next: (resposta: string) => {
        this.mensagem = resposta;
        this.novaSenha = '';
      },
      error: (error) => {
        console.error('Erro ao atualizar senha', error);
        this.mensagem = 'Erro ao atualizar senha.';
      }
    });
  }
}
