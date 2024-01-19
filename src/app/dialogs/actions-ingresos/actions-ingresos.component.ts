import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notyf } from 'notyf';
import { Personal } from 'src/app/models/personal.model';
import { PersonalService } from 'src/app/services/personal.service';
import { ActionsPersonalComponent } from '../actions-personal/actions-personal.component';
import { Ingresos } from 'src/app/models/ingresos.model';
import { IngresosService } from 'src/app/services/ingresos.service';

@Component({
  selector: 'app-actions-ingresos',
  templateUrl: './actions-ingresos.component.html',
  styleUrls: ['./actions-ingresos.component.css']
})
export class ActionsIngresosComponent implements OnInit {
  
  public currentYear: number = new Date().getFullYear();

  public notyf = new Notyf({duration: 2000,position: {x: 'right',y: 'top',},
    types: [{type: 'success',background: '#003561',dismissible: true},
      {type: 'error',background: '#c70000',dismissible: true}
    ]});

  objPersonal:Ingresos = {

    numero_cheque:"",
    managment:"",
    nombre_propiedad:"",
    cantidad:0,
    concepto:"",
    fecha:""

  }

  formRegistra = this.formBuilder.group({
    validaCheque: ['',[Validators.required, Validators.pattern(/^\d{8,10}$/)]],
    validaNombre: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,120}')]],
    validaCantidad: ['',[Validators.required, Validators.min(0.0), Validators.max(100.0)]],
    validaConcepto: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,200}')]],
    validaMagnament: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,200}')]],
    validafecha: [null,[Validators.required]]
  })
maxDate= new Date;

  

  constructor(private personalService:IngresosService,
    private dialogRef:MatDialogRef<ActionsPersonalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,private formBuilder:FormBuilder){

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
            
            this.notyf.success(x.mensaje)
            this.dialogRef.close();
          }
          else{
            this.notyf.error(x.mensaje)
          }
        }
      )
    }
    else{
      //registrar
      this.personalService.registrar(this.objPersonal).subscribe(  
        x=>{
          if(x.status){
            this.notyf.success(x.mensaje)
            this.dialogRef.close();
          }
          else{
            this.notyf.error(x.mensaje)
          }
        }
      )
    }
  }

}
