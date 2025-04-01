import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [FormsModule, CommonModule, PostListComponent]
})
export class PerfilComponent {
  username: string = '';
  imgurClientId: string = '8631a103f44b899'; // ID do cliente do Imgur
  uploadedImageUrl: string = ''; // Armazena a URL da imagem enviada

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || 'Usuário';
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Arquivo selecionado:', file.name);

      const formData = new FormData();
      formData.append('image', file);

      const headers = new HttpHeaders({
        Authorization: `Client-ID ${this.imgurClientId}`
      });

      this.http.post('https://api.imgur.com/3/image', formData, { headers }).subscribe({
        next: (response: any) => {
          this.uploadedImageUrl = response.data.link;
          console.log('Imagem enviada com sucesso:', this.uploadedImageUrl);
        },
        error: (error) => {
          console.error('Erro ao enviar a imagem:', error);
        }
      });
    }
  }
}