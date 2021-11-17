import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  heroe: any[] = [];

  constructor(private toast: ToastrService, private route: ActivatedRoute,
    private servicio: ServiceService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.infoHeroe(id);
  }

  infoHeroe(id: any){
    this.heroe = [];
    this.servicio.busquedaID(id).then((res: any) => {
      if(res.data.error) this.toast.error('Error al encontrar la informacion del personaje','')
      else this.heroe.push(res.data);
    })
  }

}
