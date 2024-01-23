import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ingresos } from '../models/ingresos.model';
import { Observable } from 'rxjs';

const url = AppSettings.API_ENDPOINT + '/ingresos'

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(private http:HttpClient) { }

  listar():Observable<Ingresos>{
    return this.http.get<Ingresos>(url);
  }

  registrar(obj:Ingresos):Observable<any>{
    return this.http.post(url,obj)
  }

  actualizar(obj:Ingresos):Observable<any>{
    return this.http.put(url,obj)
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete(url+'/'+id)
  }

  consultaDinamica(nombre:string,anio:string):Observable<Ingresos[]>{
    const params = new HttpParams()
    .set("nombre", nombre)
    .set("anio", anio);
    return this.http.get<Ingresos[]>(url+'/consulta', {params})
  }
}
