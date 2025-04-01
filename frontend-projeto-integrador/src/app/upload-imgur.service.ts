import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImgurService {

  private imgurApiUrl = 'https://api.imgur.com/3/image';
  private clientId = '8631a103f44b899'; // Substitua pelo seu Client-ID

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    const headers = new HttpHeaders().set('Authorization', `Client-ID ${this.clientId}`);

    return this.http.post<any>(this.imgurApiUrl, formData, { headers });
  }
}
