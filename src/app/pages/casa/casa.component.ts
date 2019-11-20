import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CasaModel } from '../../models/casa.model';
import { CasasService } from '../../services/casas.service';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css']
})
export class CasaComponent implements OnInit {

  casa = new CasaModel();

  constructor(  private casasService: CasasService,
                private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {

      this.casasService.getCasa(id)
      .subscribe( (resp: CasaModel) => {
        this.casa = resp;
        this.casa.id = id;
        console.log(resp);
      });

    }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formularios no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false

    });

    Swal.showLoading();

    // let peticion: Observable<any>;

    if (this.casa.id) {
      this.casasService.actualizarCasa(this.casa)
      .subscribe(resp => {
        Swal.fire({
          title: this.casa.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success'
        });
        console.log(resp);
      });

    } else {
      this.casasService.crearCasa(this.casa)
      .subscribe(resp => {
        Swal.fire({
          title: this.casa.nombre,
          text: 'Se Guardó correctamente',
          icon: 'success'
        });

        console.log(resp);
        // this.casa = resp;
      });



    }
    // console.log(form);
    // console.log(this.casa);

}


}

// --- con observable --- Forma Nueva

// if (this.casa.id) {
//   peticion = this.casasService.actualizarCasa(this.casa);
//   console.log(' entro en actualizar ');
// } else {
//   peticion = this.casasService.crearCasa(this.casa);

//   peticion.subscribe( resp => {
//     console.log(resp);
    // Swal.fire({
    //   title: this.casa.nombre,
    //   text: 'Se actualizo correctamente',
    //   icon: 'success'
    // });
//   });

// }
