import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/servicios/service.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logueado: boolean | undefined;

  constructor(private route: Router, private auth: ServiceService) { }

  ngOnInit(){
    this.logueado = this.auth.obtenerSesion();
    console.log(this.logueado)
  }

  logout(){
    localStorage.removeItem('token');
    this.logueado = false;
    this.route.navigate(['login'])
  }

}
