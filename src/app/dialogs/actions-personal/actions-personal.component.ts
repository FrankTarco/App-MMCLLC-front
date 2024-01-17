import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personal } from 'src/app/models/personal.model';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-actions-personal',
  templateUrl: './actions-personal.component.html',
  styleUrls: ['./actions-personal.component.css']
})
export class ActionsPersonalComponent implements OnInit{

  objPersonal:Personal = {
    numero_cheque:"",
    nombre_persona:"",
    cantidad:0,
    concepto:"",

  }

  constructor(private personalService:PersonalService,private dialogRef:MatDialogRef<ActionsPersonalComponent>, @Inject(MAT_DIALOG_DATA) public data:any){

  }
  ngOnInit(): void {
    if(this.data){
      this.objPersonal = this.data;
    }
    
  }

  registrarPersonal(){

    if(this.data){
      //actualizar
      this.personalService.actualizar(this.objPersonal).subscribe(  
        x=>{
          if(x.status){
            alert(x.mensaje);
            this.dialogRef.close();
          }
          else{
            alert(x.mensaje);
          }
        }
      )
    }
    else{
      //registrar
      this.personalService.registrar(this.objPersonal).subscribe(  
        x=>{
          if(x.status){
            alert(x.mensaje);
            this.dialogRef.close();
          }
          else{
            alert(x.mensaje);
          }
        }
      )
    }
  }
}
