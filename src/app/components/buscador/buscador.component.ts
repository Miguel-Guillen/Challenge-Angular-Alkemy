import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../servicios/service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  superheroe: any[] = [];
  equipo: any[] = [];
  busquedaForm: FormGroup;

  validation_messages = {
    nombre: [
      { type: "required", message: "ingrese un nombre o frase"}
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private route: Router, private servicio: ServiceService) {
    this.busquedaForm = this.formB.group({
      nombre: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    })
  }

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
  }

  buscar(value: any){
    if(this.busquedaForm.valid === true
    || this.busquedaForm.get('nombre')?.hasError('minLength') === true){
      this.superheroe = [];
      const nombre = value.nombre;
      this.servicio.busquedaNombre(nombre).then((res: any) => {
        if(res.data.error){
          this.toast.error(`No se encontro ningun personaje con el nombre "${nombre}"`, 'Nombre invalido');
        }
        else this.superheroe = res.data.results
      })
    }else {
      this.toast.error("se requiere de un nombre o frase de al menos 3 caracteres", 'Valores no validos')
    }
  }

  agregar(id: string){
    if(this.equipo.length == 0){
      for(const superheroe of this.superheroe){
        if(superheroe.id == id){
          this.equipo.push(superheroe);
          localStorage.setItem('equipo', JSON.stringify(this.equipo));
          this.toast.success(`el personaje ha sido agregado a su equipo`, `Personaje ${superheroe.name} agregado`)
        }
      }
    }else {

      if(this.equipo.length == 6){
        this.toast.warning('no se puede añadir mas personajes, su equipo ya esta completo', 'Error al añadir')
      }else {
        if(this.equipo.some(superheroe => superheroe.id == id)){
          this.toast.warning(`el personaje ya se encuentra añadido en su equipo`, 'Error al añadir')
          return
        }else {

          const heroes: any[] = [];
          const villanos: any[] = [];
          for(const superheroe of this.equipo){
            if(superheroe.biography.alignment == 'good') heroes.push(superheroe);
            if(superheroe.biography.alignment == 'bad') villanos.push(superheroe);
          };
          
          for(const superheroe of this.superheroe){
            let nuevo = true;
            if(superheroe.id == id && superheroe.biography.alignment == 'good' && heroes.length == 3){
              this.toast.warning('su equipo ya cuenta con 3 heroes, no se puede añadir mas heroes',
              'Error al añadir el personaje');
              nuevo = false;
            }
            if(superheroe.id == id && superheroe.biography.alignment == 'bad' && villanos.length == 3){
              this.toast.warning('su equipo ya cuenta con 3 villanos, no se puede añadir mas villanos',
              'Error al añadir el personaje');
              nuevo = false;
            }
            if(superheroe.id == id && nuevo === true){
              this.equipo.push(superheroe);
              localStorage.setItem('equipo', JSON.stringify(this.equipo));
              this.toast.success(`el personaje ha sido añadido a su equipo`, `Personaje ${superheroe.name} añadido`)
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
