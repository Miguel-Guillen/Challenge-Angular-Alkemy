import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment'
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  heroe: any[] = [];
  equipo: any[] = [];
  busquedaForm: FormGroup;
  url = environment.URL;

  validation_messages = {
    nombre: [
      { type: "minLength", message: "ingrese al menos 3 letras"}
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private route: Router) {
    this.busquedaForm = this.formB.group({
      nombre: new FormControl("", Validators.compose([
        Validators.minLength(3)
      ]))
    })
  }

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
    const nombre = 'bat'
    this.buscar(nombre);
  }

  buscar(value: any){
    // this.heroe = [];
    // const name = value.nombre;
    axios.get(`${this.url}/search/${value}`).then((res: any) => {
    if(res.data.error) 
    this.toast.error(`No se encontro ningun personaje con el nombre "${name}""`, 'Nombre invalido');
      else {
        this.heroe = res.data.results
      }
    })
  }

  agregar(id: string){
    if(this.equipo.length == 0){
      for(const heroe of this.heroe){
        if(heroe.id == id){
          this.equipo.push(heroe);
          localStorage.setItem('equipo', JSON.stringify(this.equipo));
          this.toast.success(`el personaje ha sido agregado a su equipo`, `Personaje ${heroe.name} agregado`)
        }
      }
    }else {
      if(this.equipo.length == 6){
        this.toast.warning('no se puede añadir mas personajes, su equipo ya esta completo', 'Error al añadir')
      }else {
        if(this.equipo.some(heroe => heroe.id == id)){
          this.toast.warning(`el personaje ya se encuentra añadido en su equipo`, 'Error al añadir')
          return
        }else {
          for(const heroe of this.heroe){
            if(heroe.id == id){
              this.equipo.push(heroe);
              localStorage.setItem('equipo', JSON.stringify(this.equipo));
              this.toast.success(`el personaje ha sido añadido a su equipo`, `Personaje ${heroe.name} añadido`)
            }
          }
        }
      }
    }
  }

  detalles(id: any){
    this.route.navigate([`detalles/${id}`])
  }

}
