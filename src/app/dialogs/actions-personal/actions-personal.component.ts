import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personal } from 'src/app/models/personal.model';
import { PersonalService } from 'src/app/services/personal.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-actions-personal',
  templateUrl: './actions-personal.component.html',
  styleUrls: ['./actions-personal.component.css']
})
export class ActionsPersonalComponent implements OnInit{


  public currentYear: number = new Date().getFullYear();

  public notyf = new Notyf({duration: 2000,position: {x: 'right',y: 'top',},
    types: [{type: 'success',background: '#003561',dismissible: true},
      {type: 'error',background: '#c70000',dismissible: true}
    ]});

  objPersonal:Personal = {
    numero_cheque:"",
    nombre_persona:"",
    cantidad:0,
    concepto:"",
    fecha:''

  }

  formRegistra = this.formBuilder.group({
    validaCheque: ['',[Validators.required, Validators.pattern(/^\d{8,10}$/)]],
    validaNombre: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,120}')]],
    validaCantidad: ['',[Validators.required, Validators.min(0.0), Validators.max(100.0)]],
    validaConcepto: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{3,200}')]],
    validafecha: [null,[Validators.required]]
  })
maxDate= new Date;

  

  constructor(private personalService:PersonalService,
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
