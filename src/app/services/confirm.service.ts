import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddConfirmComponent } from '../dialogs/add-confirm/add-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog:MatDialog) { }

  abrirDialog(data:any){
    return this.dialog.open(AddConfirmComponent, {
      data,
      width: '450px',
      disableClose:true,
      enterAnimationDuration:'800ms',
      exitAnimationDuration:'800ms',});
  }

}
