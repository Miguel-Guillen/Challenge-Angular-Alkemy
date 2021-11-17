import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.URL;
  urlLogin = 'http://challenge-react.alkemy.org/';
  
  constructor() { }

  busquedaNombre(nombre: string){
    return axios.get(`${this.url}/search/${nombre}`).then() 
  }

  busquedaID(id: string){
    return axios.get(`${this.url}/${id}`).then()
  }

  login(credenciales: any){
    return axios.post(this.url, { 
      email: credenciales.correo, 
      password: credenciales.contrasena
    }, { headers: { 'Content-Type': 'application/json' } }).then()
  }

}
