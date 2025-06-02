import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { UploadComponent } from '../upload/upload.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,PostListComponent,UploadComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})

export class FeedComponent {
  username: string | null = null;
  dropdownVisivel = false;
  user: any = null;
  userEstatistica: any = null;
  

  constructor(private router: Router , private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    this.username = nav?.extras?.state?.['username'] || null;
    console.log('Username recebido:', this.username);
    this.carregarUsuario(this.username);
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }

  toggleDropdown() {
    this.dropdownVisivel = !this.dropdownVisivel;
  }

  carregarUsuario(post: any) {
    if (!this.username) return;

    this.http.get<any>(`http://localhost:8080/usuarios/${this.username}`).subscribe({
      next: (usuario) => {
        this.user = usuario;
        console.log(`Dados do usuário ${this.username} carregados`, usuario);
        this.carregarEstatisticas(this.username!);
      },
      error: err => console.error(`Erro ao carregar dados do usuário ${this.username}`, err)
    });
  }

  carregarEstatisticas(username: string) {
    this.http.get<any>(`http://localhost:8080/posts/estatisticas/${username}`).subscribe({
      next: (res) => {
        this.userEstatistica = res;
        console.log("Estatísticas carregadas:", res);
      },
      error: (err) => console.error("Erro ao carregar estatísticas do usuário", err)
    });
  }

  
}
