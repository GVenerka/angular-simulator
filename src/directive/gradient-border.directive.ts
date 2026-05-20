import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective {

  private timer!: number | null;

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#fae503', '#126509', '#ff0000'],
    thickness: '2px'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.clearTimer();
    this.timer = setTimeout(() => {
      const colors: string = this.gradientConfiguration.colors?.join(', ') || '#fae503, #126509, #ff0000';
      const thickness: string = this.gradientConfiguration.thickness || '2px';
      this.renderer.setStyle(this.el.nativeElement, 'border', `${ thickness } solid transparent`);
      this.renderer.setStyle(this.el.nativeElement, 'background', `linear-gradient(#1e1e1e, #1e1e1e) padding-box, linear-gradient(90deg, ${ colors }) border-box`);
      this.renderer.setStyle(this.el.nativeElement, 'background-size', '300% 300%');
      this.renderer.setStyle(this.el.nativeElement, 'animation', 'gradientAnimation 5s linear infinite');
    }, this.gradientConfiguration.delay || 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.clearTimer();
    this.renderer.removeStyle(this.el.nativeElement, 'border');
    this.renderer.removeStyle(this.el.nativeElement, 'background');
    this.renderer.removeStyle(this.el.nativeElement, 'background-size');
    this.renderer.removeStyle(this.el.nativeElement, 'animation');
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

}
