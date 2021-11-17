import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  equipo: any[] = [];
  total: any[] = [{
    combate: 0,
    inteligencia: 0,
    fuerza: 0,
    resistencia: 0,
    poder: 0,
    velocidad: 0,
    peso: 0,
    altura: 0
  }];
  valor: any;
  id: string = '';

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
    this.estadisticas();
  }

  eliminar(id: string){
    this.equipo = this.equipo.filter(heroe => heroe.id !== id)
    localStorage.setItem('equipo', JSON.stringify(this.equipo));
    this.estadisticas();
    this.toast.warning("el personaje fue removido exitosamente del equipo", 'Personaje removido');
    this.id = '';
  }

  estadisticas(){
    if(this.equipo.length > 1){
      // cambiarlo a una interfaz que se reinicie
      this.total[0].combate = 0;
      this.total[0].fuerza = 0
      this.total[0].velocidad = 0
      this.total[0].inteligencia = 0
      this.total[0].resistencia = 0
      this.total[0].poder = 0
      this.total[0].peso = 0
      this.total[0].altura = 0

      for(const stats of this.equipo){
        this.total[0].combate += parseInt(stats.powerstats.combat);
        this.total[0].fuerza += parseInt(stats.powerstats.strength)
        this.total[0].inteligencia += parseInt(stats.powerstats.intelligence)
        this.total[0].poder += parseInt(stats.powerstats.power)
        this.total[0].resistencia += parseInt(stats.powerstats.durability)
        this.total[0].velocidad += parseInt(stats.powerstats.speed)
        this.total[0].peso += parseInt(stats.appearance.weight[1])
        this.total[0].altura += parseInt(stats.appearance.height[1])
      }

      const peso: any = this.total[0].peso / this.equipo.length+1;
      const altura: any = this.total[0].altura / this.equipo.length+1;
      this.total[0].peso = parseInt(peso);
      this.total[0].altura = parseInt(altura);

      for(const max of this.total){
        if(max.combate > max.fuerza && max.combate > max.velocidad && max.combate 
          > max.poder && max.combate > max.resistencia && max.combate > max.inteligencia) 
          { this.valor = 'combate'}
        if(max.fuerza > max.combate && max.fuerza > max.velocidad && max.fuerza > max.poder 
          && max.fuerza > max.resistencia && max.fuerza > max.inteligencia) 
          { this.valor = 'fuerza'}
        if(max.velocidad > max.combate && max.velocidad > max.fuerza && max.velocidad > max.poder 
          && max.velocidad > max.resistencia && max.velocidad > max.inteligencia) 
          { this.valor = 'velocidad'}
        if(max.poder > max.combate && max.poder > max.velocidad && max.poder > max.fuerza 
          && max.poder > max.resistencia && max.poder > max.inteligencia) 
          { this.valor = 'poder'}
        if(max.resistencia > max.combate && max.resistencia > max.velocidad && max.resistencia > 
          max.fuerza && max.resistencia > max.poder && max.resistencia > max.inteligencia) 
          { this.valor = 'resistencia'}
        if(max.inteligencia > max.combate && max.inteligencia > max.velocidad && max.inteligencia > 
          max.poder && max.inteligencia > max.resistencia && max.inteligencia > max.fuerza) 
          { this.valor = 'inteligencia'}
        if(this.valor === undefined) this.valor = 'equilibrado'
      }
    }
  }

}
