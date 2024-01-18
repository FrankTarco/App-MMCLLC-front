import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal.model';

const url = AppSettings.API_ENDPOINT + '/personal'

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http:HttpClient) { }

  listar():Observable<Personal[]>{
    return this.http.get<Personal[]>(url);
  }

  registrar(obj:Personal):Observable<any>{
    return this.http.post(url,obj)
  }

  actualizar(obj:Personal):Observable<any>{
    return this.http.put(url,obj)
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete(url+'/'+id)
  }

  consultaDinamica(nombre:string,anio:string):Observable<Personal[]>{
    const params = new HttpParams()
    .set("nombre", nombre)
    .set("anio", anio);
    return this.http.get<Personal[]>(url+'/consulta', {params})
  }

}
