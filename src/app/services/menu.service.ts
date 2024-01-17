import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private elementoActualS = new BehaviorSubject<string>('');
  elementoActual$ = this.elementoActualS.asObservable();

  constructor() { }

  setElementoActual(elemento: string) {
    this.elementoActualS.next(elemento);
  }

}
