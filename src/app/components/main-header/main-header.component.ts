import { Component } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {


  activeIndex = 0;
  menu = false;
  toggleActive(index: number): void {
    this.activeIndex = index;
  }


  menuActive():void{
    this.menu = !this.menu;
  }

}
