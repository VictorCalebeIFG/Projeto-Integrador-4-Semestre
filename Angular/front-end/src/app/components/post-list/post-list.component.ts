import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  comentarioTextMap: { [key: number]: string } = {};
  usuarioNome: string = ''; // Nome do usuário logado

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarPosts();

    const usuarioSalvoStr = localStorage.getItem('usuarioLogado');
    if (usuarioSalvoStr) {
      this.usuarioNome = usuarioSalvoStr;
    } else {
      console.warn('Usuário não encontrado no localStorage');
    }
  }

  carregarPosts() {
    this.http.get<any[]>('http://localhost:8080/posts').subscribe({
      next: (data) => {
        this.posts = data.map(post => ({
          ...post,
          imageUrl: post.imagepath ? 'data:image/jpeg;base64,' + post.imagepath : null,
          usuarioData: null // reserva espaço para os dados do autor
        }));
        this.posts.forEach(post => {
          this.carregarComentarios(post);
          this.carregarUsuarioDoPost(post); // aqui carregamos o autor
        });
      },
      error: err => console.error('Erro ao carregar posts', err)
    });
  }

  carregarUsuarioDoPost(post: any) {
    if (!post.username) return;

    this.http.get<any>(`http://localhost:8080/usuarios/${post.username}`).subscribe({
      next: (usuario) => {
        post.usuarioData = usuario;
        console.log(`Dados do usuário ${post.username} carregados`, usuario);
      },
      error: err => console.error(`Erro ao carregar dados do usuário ${post.username}`, err)
    });
  }

  curtir(post: any) {
    this.http.post(`http://localhost:8080/posts/${post.id}/like`, {}).subscribe({
      next: () => this.carregarPosts(),
      error: err => console.error('Erro ao curtir', err)
    });
  }

  carregarComentarios(post: any) {
    this.http.get<any[]>(`http://localhost:8080/comentarios/post/${post.id}`).subscribe({
      next: (comentarios) => {
        post.comments = comentarios;
      },
      error: err => console.error('Erro ao carregar comentários', err)
    });
  }

  comentar(post: any, comentarioTexto: string) {
    if (!comentarioTexto?.trim()) return;

    const body = new URLSearchParams();
    body.set('postId', post.id.toString());
    body.set('usuario', this.usuarioNome);
    body.set('texto', comentarioTexto.trim());

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post('http://localhost:8080/comentarios', body.toString(), { headers }).subscribe({
      next: () => {
        this.comentarioTextMap[post.id] = '';
        this.carregarComentarios(post);
      },
      error: err => console.error('Erro ao comentar:', err)
    });
  }
}
