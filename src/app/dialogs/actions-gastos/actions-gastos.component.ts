import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notyf } from 'notyf';
import { Ingresos } from 'src/app/models/ingresos.model';
import { IngresosService } from 'src/app/services/ingresos.service';
import { ActionsPersonalComponent } from '../actions-personal/actions-personal.component';
import { Gastos } from 'src/app/models/gastos.model';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-actions-gastos',
  templateUrl: './actions-gastos.component.html',
  styleUrls: ['./actions-gastos.component.css']
})
export class ActionsGastosComponent implements OnInit {

  public currentYear: number = new Date().getFullYear();

  public notyf = new Notyf({duration: 2000,position: {x: 'right',y: 'top',},
    types: [{type: 'success',background: '#003561',dismissible: true},
      {type: 'error',background: '#c70000',dismissible: true}
    ]});

  objPersonal:Gastos = {

    numero_boleta:"",
    nombre_tienda:"",
    cantidad:0,
    concepto:"",
    fecha:""

  }

  formRegistra = this.formBuilder.group({
    validaCheque: ['',[Validators.required, Validators.pattern(/^BOL-\d{6,}$/)]],
    validaNombre: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,120}')]],
    validaCantidad: ['',[Validators.required, Validators.min(0.0), Validators.max(1000.0)]],
    validaConcepto: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,200}')]],
    validafecha: [null,[Validators.required]]
  })
maxDate= new Date;

  

  constructor(private personalService:GastosService,
    private dialogRef:MatDialogRef<ActionsGastosComponent>, 
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
