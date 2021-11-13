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


}
