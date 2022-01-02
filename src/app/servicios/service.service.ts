import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import axios from 'axios';

import { environment } from '../../environments/environment'
import { Heroe } from '../models/heroe';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.URL;
  url_login = environment.URL_Login
  headers = new HttpHeaders();
  
  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  busquedaNombre(nombre: string): Observable<Heroe[]>{
    const search = 'search/';
    return this.http.get<Heroe[]>(this.url + search + nombre, { headers: this.headers });
  }

  busquedaID(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(this.url + id, { headers: this.headers });
  }

  login(credenciales: any): Observable<any>{
    const data = {
      email: credenciales.correo, 
      password: credenciales.contrasena
    };

    return this.http.post(this.url_login, data, { headers: this.headers });
  }

}
