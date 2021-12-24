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
  
  constructor(private http: HttpClient) { }

  busquedaNombre(nombre: string): Observable<Heroe[]>{
    const search = 'search/';
    let headers = new HttpHeaders().set(
      'Content-Type', 'application/json',
    );

    return this.http.get<Heroe[]>(this.url + search + nombre, { headers: headers });
  }

  busquedaID(id: string): Observable<Heroe>{
    let headers = new HttpHeaders().set(
      'Content-Type', 'application/json',
    );

    return this.http.get<Heroe>(this.url + id, { headers: headers });
  }

  login(credenciales: any): Observable<any>{
    let headers = new HttpHeaders().set(
      'Content-Type', 'application/json',
    );
    const data = {
      email: credenciales.correo, 
      password: credenciales.contrasena
    };

    return this.http.post(this.url_login, data, { headers: headers });
  }

}
