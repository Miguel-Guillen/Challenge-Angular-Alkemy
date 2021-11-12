import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../servicios/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private auth: ServiceService){ }

  async canActivate() {
    const token = await localStorage.getItem("token");
    if(!token){
      this.route.navigate(['login'])
    }
    return true;
  }
  
}
