import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[appCheckbox]',
})
export class CheckboxDirective {

  constructor(
    private element: ElementRef,
    private changeDetector : ChangeDetectorRef
    ) {}
  @HostBinding('attr.role') role = 'checkbox';
  @HostBinding('attr.aria-checked') checked = false;
  @HostBinding('attr.tabindex') tabIndex = 0;


  ngAfterViewInit() {
    this.changeDetector.detach();
  }

  @HostListener('click', ['$event.target.checked'])
  change( checked:any ) {
    this.checked = checked;
    this.changeDetector.detectChanges();
    if(this.checked){
      this.highlight()
    }
  }

  private highlight() {
    this.element.nativeElement.querySelector('.input-sub-task').style.backgroundColor = '#afafaf';
    this.element.nativeElement.style.backgroundColor = '#afafaf';
  }
}
