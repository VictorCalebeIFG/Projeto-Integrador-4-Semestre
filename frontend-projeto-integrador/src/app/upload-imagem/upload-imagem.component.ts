import { Component } from '@angular/core';
import { UploadImgurService } from '../upload-imgur.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css'],
  imports:[CommonModule]
})
export class UploadImagemComponent {
  imageUrl: string | null = null; // Para armazenar a URL da imagem
  uploadedImgUrl: string = ''; // Para armazenar o link da imagem enviada
  selectedImage: File | null = null; // Para armazenar a imagem selecionada
  errorMessage: string = '';

  constructor(private uploadImgurService: UploadImgurService) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Exibe a imagem de visualização
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.selectedImage) {
      this.uploadImgurService.uploadImage(this.selectedImage).subscribe(
        (response) => {
          this.uploadedImgUrl = response.data.link; // Exibe o link da imagem
        },
        (error) => {
          this.errorMessage = 'Erro ao fazer upload da imagem.';
          console.error(error);
        }
      );
    } else {
      alert('Por favor, selecione uma imagem.');
    }
  }
}
