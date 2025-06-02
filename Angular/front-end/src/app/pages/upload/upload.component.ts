import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  titulo = '';
  selectedFile: File | null = null;
  username: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.username = usuarioSalvo;
    } else {
      alert('Usuário não logado!');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.titulo || !this.selectedFile || !this.username) {
      alert('Preencha todos os campos e selecione uma imagem!');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('username', this.username); // agora preenchido automaticamente
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:8080/posts', formData).subscribe({
      next: () => {
        alert('Post criado com sucesso!');
      },
      error: () => {
        alert('Erro ao criar o post');
      }
    });
  }
}
