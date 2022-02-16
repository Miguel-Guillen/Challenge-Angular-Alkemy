import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/servicios/service.service';

import { Heroe } from 'src/app/models/heroe';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  heroe: Heroe | undefined;

  constructor(private toast: ToastrService, private route: ActivatedRoute,
    private servicio: ServiceService, private router: Router) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.infoHeroe(id);
  }

  infoHeroe(id: string){
    let response = 'success';

    this.servicio.busquedaID(id).subscribe((res: any) => {
      if(res.response == response){
        this.heroe = res;
      }else {
        console.log(res);
        this.toast.error('Error al encontrar la informacion del personaje', '',
        { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/buscar']);
      }
    }, err => {
      console.log(err);
      this.toast.error('Ha ocurrido un error cargar los datos del superheroe',
      'Error al cargar la informacion');
      this.router.navigate(['/buscar']);
    })
  }

}
