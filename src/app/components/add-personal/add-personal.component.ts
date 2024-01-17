import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionsPersonalComponent } from 'src/app/dialogs/actions-personal/actions-personal.component';
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
  dataSource:any;


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private dialog:MatDialog,private personalService:PersonalService){}

  ngOnInit(): void {
    this.listarDatos();
  }

  listarDatos(){
    this.personalService.listar().subscribe(
      x=>{
        this.dataSource = x
      }
    )
  }
  abrirModal(){
   const _dialog = this.dialog.open(ActionsPersonalComponent);
   _dialog.afterClosed().subscribe(()=>{
    this.listarDatos();
   })
  }

  abrirEditDialog(data:any){
    const _dialog = this.dialog.open(ActionsPersonalComponent, {data,});
    _dialog.afterClosed().subscribe(()=>{
      this.listarDatos();
     })
    }


  eliminarPersonal(id:number){
    this.personalService.eliminar(id).subscribe(
      x=>{
        if(x.status){
          alert(x.mensaje);
          this.listarDatos();
        }
        else{
          alert(x.mensaje)
        }
      }
    )
  }

}
