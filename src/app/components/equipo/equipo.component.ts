import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { REMOVE_CHARACTER } from 'src/app/actions/heroe.actions';
import { appState } from 'src/app/models/app.state';
import { Heroe } from 'src/app/models/heroe';
import { Stats } from 'src/app/models/stats';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  equipo: Array<Heroe> = [];
  equipo$: Observable<Array<Heroe>>
  total: Stats[];
  valor: any;
  id = '';

  constructor(private toast: ToastrService, private store: Store<appState>) {
    this.equipo$ = this.store.select(store => store.heroes);
    this.total = [{
      combat: 0,
      strength: 0,
      speed: 0,
      intelligence: 0,
      durability: 0,
      power: 0,
      weight: 0,
      height: 0
    }];
  }

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
    this.estadisticas();
  }

  eliminar(id: string){
    const action = {
      type: REMOVE_CHARACTER,
      payload: id
    };
    this.store.dispatch(action);
    this.equipo = this.equipo.filter(item => item.id !== id);
    localStorage.setItem('equipo', JSON.stringify(this.equipo));
    this.estadisticas();
    this.toast.info("el personaje fue removido exitosamente del equipo",
    'Personaje removido');
    this.id = '';
  }

  estadisticas(){
    if(this.equipo.length > 1){
      this.total = [{
        combat: 0,
        strength: 0,
        speed: 0,
        intelligence: 0,
        durability: 0,
        power: 0,
        weight: 0,
        height: 0
      }];
      
      for(const stats of this.equipo){
        this.total[0].combat += parseInt(stats.powerstats.combat);
        this.total[0].strength += parseInt(stats.powerstats.strength);
        this.total[0].intelligence += parseInt(stats.powerstats.intelligence)
        this.total[0].power += parseInt(stats.powerstats.power)
        this.total[0].durability += parseInt(stats.powerstats.durability)
        this.total[0].speed += parseInt(stats.powerstats.speed)
        this.total[0].weight += parseInt(stats.appearance.weight[1])
        this.total[0].height += parseInt(stats.appearance.height[1])
      }

      this.total[0].weight = this.total[0].weight / this.equipo.length+1;
      const altura = this.total[0].height / this.equipo.length+1;
      this.total[0].height = altura / 100;

      for(const max of this.total){
        if(max.combat > max.strength && max.combat > max.speed && max.combat 
          > max.power && max.combat > max.durability && max.combat > max.intelligence) 
          { this.valor = 'combate'}
        if(max.strength > max.combat && max.strength > max.speed && max.strength > max.power 
          && max.strength > max.durability && max.strength > max.intelligence) 
          { this.valor = 'fuerza'}
        if(max.speed > max.combat && max.speed > max.strength && max.speed > max.power 
          && max.speed > max.durability && max.speed > max.intelligence) 
          { this.valor = 'velocidad'}
        if(max.power > max.combat && max.power > max.speed && max.power > max.strength
          && max.power > max.durability && max.power > max.intelligence) 
          { this.valor = 'poder'}
        if(max.durability > max.combat && max.durability > max.speed && max.durability > 
          max.strength && max.durability > max.power && max.durability > max.intelligence) 
          { this.valor = 'resistencia'}
        if(max.intelligence > max.combat && max.intelligence > max.speed && max.intelligence > 
          max.power && max.intelligence > max.durability && max.intelligence > max.strength) 
          { this.valor = 'inteligencia'}
        if(this.valor === undefined) this.valor = 'equilibrado'
      }
    }
  }

}
