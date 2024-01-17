import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  elementoActual:string = "dash";

  constructor(private menuService:MenuService){
  }

  ngOnInit(): void {
    this.menuService.elementoActual$.subscribe(
      x=> this.elementoActual = x
    )
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
