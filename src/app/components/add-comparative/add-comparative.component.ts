import { Component } from '@angular/core';

@Component({
  selector: 'app-add-comparative',
  templateUrl: './add-comparative.component.html',
  styleUrls: ['./add-comparative.component.css']
})
export class AddComparativeComponent {

  imgWidth = '50%';
  dragLineLeft = '50%';

  onSliderInput(event: any): void {
    const sliderVal = event.target.value + '%';
    this.dragLineLeft = sliderVal;
    this.imgWidth = sliderVal;
  }

}
