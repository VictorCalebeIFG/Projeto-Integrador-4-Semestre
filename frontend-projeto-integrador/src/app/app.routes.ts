import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'cadastro', component: CadastroComponent }
];