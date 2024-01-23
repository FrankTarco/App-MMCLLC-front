import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent implements AfterViewInit{
  
  @ViewChild('imageList') imageListRef!: ElementRef;
  @ViewChild('prevButon') prevButton!: ElementRef;
  @ViewChild('nextButon') nextButton!: ElementRef;
  @ViewChild('sliderscrollbar') sliderScrollbarRef!: ElementRef;
  @ViewChild('scrollbarthumb') scrollbarThumbRef!: ElementRef;

  private maxScrollLeft!: number;

  constructor(private renderer:Renderer2){}

  ngAfterViewInit(): void {
    this.initSlider();
  }


  private initSlider = () => {
    const imageList: HTMLElement = this.imageListRef.nativeElement;
    //const slideButtons: NodeListOf<HTMLElement> = this.slideButtonsRef.nativeElement;
    const sliderScrollbar: HTMLElement = this.sliderScrollbarRef.nativeElement;
    const scrollbarThumb: HTMLElement = this.scrollbarThumbRef.nativeElement;
    const prevButon:HTMLElement = this.prevButton.nativeElement;
    const nextButon:HTMLElement = this.nextButton.nativeElement;

    this.maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    this.renderer.listen(scrollbarThumb, 'mousedown', (e: MouseEvent) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      // Update thumb position on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;

        // Ensure the scrollbar thumb stays within bounds
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * this.maxScrollLeft;

        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      };

      // Remove event listeners on mouse up
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      // Add event listeners for drag interaction
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });

      this.renderer.listen(prevButon, 'click', ()=>{
        const direction = -1
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      })

      this.renderer.listen(nextButon, 'click', ()=>{
        const direction = 1
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      })

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
      prevButon.style.display = imageList.scrollLeft <= 0 ? 'none' : 'flex';
      nextButon.style.display = imageList.scrollLeft >= this.maxScrollLeft ? 'none' : 'flex';
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / this.maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when image list scrolls
    imageList.addEventListener('scroll', () => {
      updateScrollThumbPosition();
      handleSlideButtons();
    });
  };
  
}

