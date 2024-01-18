import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = AppSettings.API_ENDPOINT + '/pdf'
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http:HttpClient) { }

  descargarPdf(nombre:string,anio:string,total:number){
    const params = new HttpParams()
    .set("nombre", nombre)
    .set("anio", anio)
    .set("total", total);
    const urlConParametros = `${url}/export?${params.toString()}`
    return this.http.get(urlConParametros,{responseType:'blob'})
  }
}
