import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notyf } from 'notyf';
import { ActionsGastosComponent } from 'src/app/dialogs/actions-gastos/actions-gastos.component';
import { ReporteResponse } from 'src/app/models/reporte-response.model';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ExcelService } from 'src/app/services/excel.service';
import { GastosService } from 'src/app/services/gastos.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-add-gastos',
  templateUrl: './add-gastos.component.html',
  styleUrls: ['./add-gastos.component.css']
})
export class AddGastosComponent implements OnInit {

  displayedColumns: string[] = ['id','fecha','cantidad','concepto','nombre','cheque','actions'];
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
  constructor(private dialog:MatDialog,private ingresoService:GastosService,private confirmService:ConfirmService,private pdfService:PdfService,private excelService:ExcelService){
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
      this.confirmService.abrirDialog('¿Estas seguro de eliminar el gasto?').afterClosed().subscribe(
        res=>{
          if(res){
            this.ingresoService.eliminar(id).subscribe(
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
    this.ingresoService.consultaDinamica(this.nameSearch,this.anioSearch).subscribe(
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
   const _dialog = this.dialog.open(ActionsGastosComponent,{width:'450px'});
   _dialog.afterClosed().subscribe(()=>{
    this.listarDatos();
   })
  }

  abrirEditDialog(data:any){
    const _dialog = this.dialog.open(ActionsGastosComponent, {data,width:'450px'});
    _dialog.afterClosed().subscribe(()=>{
      this.listarDatos();
     })
    }


    getPdf(){
      const data:ReporteResponse={
        titulo:'Reporte de Gastos',
        cabezera:['Tienda','Boleta', 'Cantidad', 'Concepto', 'Fecha'],
        data:this.dataSource.data,
        total:this.total,
        type:'gastos'
      }
      
      this.pdfService.descargarPdf(data).subscribe(
        (data)=>{
          let download = window.URL.createObjectURL(data)
          let link = document.createElement('a')
          link.href=download
          link.download="reporteGastos.pdf"
          link.click()
        }
      )
    }
 
    getExcel(){
      let data = document.getElementById("table-data");
      this.excelService.exportExcel(data)
    }

}
