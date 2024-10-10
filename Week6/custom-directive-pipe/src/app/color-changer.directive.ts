import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChanger]',
  standalone: true
})
export class ColorChangerDirective {
  @Input()
  appColorChanger:any; 

  obj:any;
  constructor(private el:ElementRef, private renderer:Renderer2) {

   }

  //  @HostListener('mouseenter') onMouseEnter() {
  //   this.changer(this.colorStyle || 'yellow'); // Default color
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.changer('blue'); // Reset the background color
  // }
  //  ngOnChanges(){
  //   this.renderer.setStyle(this.el.nativeElement,'backgroundcolor',this.colorStyle)
  //  }

  ngOnInit() {
    
    this.obj=JSON.parse(this.appColorChanger)
    this.applychanges();
  }
  // ngOnChanges() {
  //   this.applyStyle();
  // }

  // private applyStyle() {
  //   switch (this.appColorChanger) {
  //     case 'bold':
  //       this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
  //       break;
  //     case 'yellow':
  //       this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
  //       break;
  //     case 'green':
  //       this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
  //       break;
  //     default:
  //       break;
  //   }
  // }

  private applychanges(){

      this.renderer.setStyle(this.el.nativeElement, 'fontWeight', this.obj.weight);
      this.renderer.setStyle(this.el.nativeElement,'color',this.obj.color);
  }

  //  public changer(color:string){
  //   this.renderer.setStyle(this.el.nativeElement,'backgroundColor',color)
  //  }

}
