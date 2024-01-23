import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notyf } from 'notyf';
import { ActionsIngresosComponent } from 'src/app/dialogs/actions-ingresos/actions-ingresos.component';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ExcelService } from 'src/app/services/excel.service';
import { IngresosService } from 'src/app/services/ingresos.service';
import { PdfService } from 'src/app/services/pdf.service';


@Component({
  selector: 'app-add-ingresos',
  templateUrl: './add-ingresos.component.html',
  styleUrls: ['./add-ingresos.component.css']
})
export class AddIngresosComponent implements OnInit {
  displayedColumns: string[] = ['id','fecha','cantidad','concepto','managment','nombre','cheque','actions'];
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
  constructor(private dialog:MatDialog,private ingresoService:IngresosService,private confirmService:ConfirmService,private pdfService:PdfService,private excelService:ExcelService){
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
      this.confirmService.abrirDialog('¿Estas seguro de eliminar el ingreso?').afterClosed().subscribe(
        
        res=>{
          console.log(id)
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
   const _dialog = this.dialog.open(ActionsIngresosComponent,{width:'450px'});
   _dialog.afterClosed().subscribe(()=>{
    this.listarDatos();
   })
  }

  abrirEditDialog(data:any){
    const _dialog = this.dialog.open(ActionsIngresosComponent, {data,width:'450px'});
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
