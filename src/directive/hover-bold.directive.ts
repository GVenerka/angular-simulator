import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
})
export class HoverBoldDirective {

  @HostBinding('style.fontWeight')
  fontWeight = 'normal';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.fontWeight = 'normal';
  }

}
