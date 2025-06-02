import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // se estiver usando rotas
import { routes } from './app/app.routes';       // se estiver usando rotas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),      
    provideRouter(routes)    
  ]
});