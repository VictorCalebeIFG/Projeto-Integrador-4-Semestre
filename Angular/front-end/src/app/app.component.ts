import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, // 
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'front-end';

  usuarioLogado: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.usuarioLogado = localStorage.getItem('usuarioLogado');
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }

  

}