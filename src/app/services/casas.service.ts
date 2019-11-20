import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CasaModel } from '../models/casa.model';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class CasasService {

  private url = 'https://firechat-abb71.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearCasa( casa: CasaModel) {

    return this.http.post(`${ this.url }/casas.json`, casa)
    .pipe(
      map ( (resp: any) => {
        casa.id = resp.name;
        return casa;
      })
    );

  }

  actualizarCasa( casa: CasaModel ) {
    const casaTemp = {
      ...casa
    };

    delete casaTemp.id;
    console.log('ActualizarCasa');
    return this.http.put(`${ this.url }/casas/${ casa.id }.json`, casaTemp);
  }

  borrarCasa(id: string) {
    return this.http.delete(`${ this.url }/casas/${ id }.json`);
  }

  getCasa(id: string) {
    return this.http.get(`${ this.url }/casas/${ id }.json`);
  }

  getCasas() {
    return this.http.get(`${ this.url }/casas.json`)
            .pipe(
              map(resp => this.crearArreglo(resp))
              );
  }

  private crearArreglo( casasObj: object) {

    const casas: CasaModel[] = [];
    console.log(casasObj);
    if (casasObj === null) {return []; }
    Object.keys(casasObj).forEach( key => {
      const heroe: CasaModel = casasObj[key];
      heroe.id = key;

      casas.push( heroe);
    });
    return casas;
  }

}
