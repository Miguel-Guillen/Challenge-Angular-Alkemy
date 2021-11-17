import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.URL;
  
  constructor() { }

  busquedaNombre(nombre: string){
    return axios.get(`${this.url}/search/${nombre}`).then() 
  }

  busquedaID(id: string){
    return axios.get(`${this.url}/${id}`).then()
  }

}
