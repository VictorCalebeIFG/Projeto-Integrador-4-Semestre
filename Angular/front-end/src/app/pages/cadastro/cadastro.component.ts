import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  username = '';
  password = '';
  selectedFile: File | null = null;
  previewUrl: string = ''; 
  cadastroSucesso = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post<any>('http://localhost:8080/usuarios/cadastrar', formData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        this.cadastroSucesso = true;

        // Supondo que a imagem venha como array de bytes (imgPath: number[])
        if (response.imgPath) {
          this.previewUrl = 'data:image/jpeg;base64,' + response.imgPath;
        }

        alert('Usuário cadastrado!');
      },
      error: err => {
        console.error('Erro ao cadastrar', err);
        alert('Erro ao cadastrar');
      }
    });
  }
}
