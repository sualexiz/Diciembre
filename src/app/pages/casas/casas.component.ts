import { Component, OnInit } from '@angular/core';
import { CasasService } from '../../services/casas.service';
import { CasaModel } from '../../models/casa.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css']
})
export class CasasComponent implements OnInit {

  casas: CasaModel[] = [];
  cargando = false;

  constructor( private casasService: CasasService) { }

  ngOnInit() {
    this.cargando = true;
    this.casasService.getCasas()
    .subscribe( resp => {
      // console.log(resp);
      this.casas = resp;
      this.cargando = false;
    });
  }

  borrarCasa( casa: CasaModel, i: number) {

    Swal.fire({
      title: '¿Está Seguro?',
      text: `¿Está seguro de que desea borrar a ${casa.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value){
        this.casas.splice(i, 1);
        this.casasService.borrarCasa(casa.id).subscribe();
      }
    });

  }

}
