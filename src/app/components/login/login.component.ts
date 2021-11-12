import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  url = 'http://challenge-react.alkemy.org/';
  token = ''

  validation_messages = {
    correo: [
      { type: "required", message: "ingrese un correo"},
      { type: "pattern", message: "no es un correo valido"}
    ],
    contrasena: [
      { type: "required", message: "ingrese su contraseña"},
      { type: "minLength", message: "su contraseña debe ser de al menos 5 letras"}
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private route: Router, private auth: ServiceService) {
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
    axios.post(this.url, { 
      email: value.correo, 
      password: value.contrasena
    }, { headers: { 'Content-Type': 'application/json' } }).then((res: any) => {
        this.token = res.data;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.route.navigate(['equipo']);
    }).catch((err: any) => {
      this.toast.error('Correo o contraseña incorrectos','Ha ocurrido un error')
    })
  }

}
