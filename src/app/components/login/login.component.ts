import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token = ''
  loginInvalid = false;

  validation_messages = {
    correo: [
      { type: "required", message: "ingrese un correo"},
      { type: "pattern", message: "no es un correo valido"}
    ],
    contrasena: [
      { type: "required", message: "ingrese su contraseña"},
    ]
  }

  constructor(private formB: FormBuilder, private servicio: ServiceService,
    private route: Router) {
    this.loginForm = this.formB.group({
      correo: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      contrasena: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })
  }

  ngOnInit(): void {
  }

  login(value: any){
    if(!this.loginForm.invalid){
      this.servicio.login(value).then((res: any) => {
        this.token = res.data;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.route.navigate(['equipo']);
      })
    }else {
      this.loginInvalid = true;
    }
  }

}
