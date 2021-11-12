import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.URL;
  logueado: boolean | undefined;
  
  constructor(private http: HttpClient) { }

  obtenerSesion(){
    const sesion = JSON.parse(localStorage.getItem("token") || "");
    if(sesion !== ""){
      this.logueado = true;
    }
    else {
      this.logueado = false;
    };
    return this.logueado
  }

}
