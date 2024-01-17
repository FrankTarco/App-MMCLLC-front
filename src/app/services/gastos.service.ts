import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from '../models/gastos.model';

const url = AppSettings.API_ENDPOINT + '/gastos'

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(private http:HttpClient) { }

  listar():Observable<Gastos>{
    return this.http.get<Gastos>(url);
  }

  registrar(obj:Gastos):Observable<any>{
    return this.http.post(url,obj)
  }

  actualizar(obj:Gastos):Observable<any>{
    return this.http.put(url,obj)
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete(url+'/'+id)
  }


}
