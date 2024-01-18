import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notyf } from 'notyf';
import { ActionsPersonalComponent } from 'src/app/dialogs/actions-personal/actions-personal.component';
import { Personal } from 'src/app/models/personal.model';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ExcelService } from 'src/app/services/excel.service';
import { PdfService } from 'src/app/services/pdf.service';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AddPersonalComponent implements OnInit{

  displayedColumns: string[] = ['cheque', 'persona', 'cantidad', 'concepto', 'fecha', 'actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  nameSearch = ''
  anioSearch = ''

  total = 0.00;

  notyf = new Notyf({duration: 2000,position: {x: 'right',y: 'top',},
    types: [{type: 'success',background: '#003561',dismissible: true},
      {type: 'error',background: '#c70000',dismissible: true}
    ]});
  constructor(private dialog:MatDialog,private personalService:PersonalService,private confirmService:ConfirmService,private pdfService:PdfService,private excelService:ExcelService){
  }

  ngOnInit(): void {
    this.listarDatos();
  }

  applyFilter() {
    this.listarDatos();
    this.dataSource.paginator!.firstPage();
  }

  applyFilterYear(){
    if(this.anioSearch.length === 4){
      console.log("valido para el filtro")
      this.listarDatos()
    }
  }


  eliminarPersonal(id:number){
      this.confirmService.abrirDialog('¿Estas seguro de eliminar al personal?').afterClosed().subscribe(
        res=>{
          if(res){
            this.personalService.eliminar(id).subscribe(
              x=>{
                if(x.status){
                  this.notyf.success(x.mensaje)
                  this.listarDatos();
                }
                else{
                  this.notyf.error(x.mensaje)
                }
              }
            )

          }
        }
      )
  }

  listarDatos(){
    this.personalService.consultaDinamica(this.nameSearch,this.anioSearch).subscribe(
      (x)=>{
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calcularTotal(null);
      }
    )
  }

  calcularTotal(datos:any){
    this.total = 0.00;
    if(datos){
      datos.forEach((item:any)=>{
      this.total+=item.cantidad;
      });
      
    }
    else{
      this.dataSource.data.forEach((item:any) =>{
      this.total+=item.cantidad;
      });
    }
    
   
  }

  abrirModal(){
   const _dialog = this.dialog.open(ActionsPersonalComponent,{width:'450px'});
   _dialog.afterClosed().subscribe(()=>{
    this.listarDatos();
   })
  }

  abrirEditDialog(data:any){
    const _dialog = this.dialog.open(ActionsPersonalComponent, {data,width:'450px'});
    _dialog.afterClosed().subscribe(()=>{
      this.listarDatos();
     })
    }


    getPdf(){
      this.pdfService.descargarPdf(this.nameSearch,this.anioSearch,this.total).subscribe(
        (data)=>{
          let download = window.URL.createObjectURL(data)
          let link = document.createElement('a')
          link.href=download
          link.download="reporte.pdf"
          link.click()
        }
      )
    } 

    getExcel(){
      let data = document.getElementById("table-data");
      this.excelService.exportExcel(data)
    }

}
