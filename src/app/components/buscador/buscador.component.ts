import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../servicios/service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Heroe } from 'src/app/models/heroe';
import { appState } from 'src/app/models/app.state';
import { ADD_CHARACTER } from 'src/app/actions/heroe.actions';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  superheroe: Array<Heroe> = [];
  equipo$: Observable<Array<Heroe>>
  equipo: Array<Heroe> = [];
  busquedaForm: FormGroup;

  validation_messages = {
    nombre: [
      { type: "required", message: "ingrese un nombre o frase"}
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private route: Router, private servicio: ServiceService,
    private store: Store<appState>) {

    this.busquedaForm = this.formB.group({
      nombre: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    })

    this.equipo$ = this.store.select(store => store.heroes);
  }

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
  }

  buscar(value: any){
    if(this.busquedaForm.valid === true ||
      this.busquedaForm.get('nombre')?.hasError('minLength') === true){
      this.superheroe = [];
      const nombre = value.nombre;

      this.servicio.busquedaNombre(nombre).subscribe((res: any) => {
        const notFound = 'character with given name not found';
        if(res.error == notFound){
          this.toast.error(`No se encontro ningun superheroe ${nombre}"`);
        }else{
          this.superheroe = res.results;
          this.toast.success('superheroes encontrados', '',
          { positionClass: 'toast-bottom-right' });
        };
      }, err => {
        this.toast.error('Ha ocurrido un error al realizar la busqueda');
        console.log(err);
      })
    }else this.toast.error("se requiere de un nombre o frase de al menos 3 caracteres");
  }

  agregar(id: string){
    if(this.equipo.length < 6){
      if(this.equipo.some(superheroe => superheroe.id == id)){
        this.toast.warning(`el personaje ya se encuentra añadido en su equipo`,
        'Error al añadir');
      }else {
        const heroes: any[] = [];
        const villanos: any[] = [];

        for(const superheroe of this.equipo){
          if(superheroe.biography.alignment == 'good') heroes.push(superheroe);
          if(superheroe.biography.alignment == 'bad') villanos.push(superheroe);
        };

        for(const superheroe of this.superheroe){
          let nuevo = true;

          if(superheroe.id == id && superheroe.biography.alignment == 'good' &&
          heroes.length == 3){
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
            const action = {
              type: ADD_CHARACTER,
              payload: <Heroe> superheroe
            };
            this.store.dispatch(action);
            this.equipo.push(superheroe);
            localStorage.setItem('equipo', JSON.stringify(this.equipo));
            this.toast.success(`El Personaje ${superheroe.name} ha sido añadido a su equipo`,
            '', { positionClass: 'toast-bottom-right' });
          }

        }
      }
    }else this.toast.warning('no se puede añadir mas personajes, su equipo ya esta completo',
    'Error al añadir');
  }

  detalles(id: any){
    this.route.navigate([`detalles/${id}`])
  }

}
