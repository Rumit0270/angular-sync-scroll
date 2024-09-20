import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appNativeScrollSync]',
  standalone: true,
})
export class NativeScrollSyncDirective {
  @Input({ required: true }) scrollTargetIds: string[] = [];

  constructor(private _ref: ElementRef) {}

  ngAfterViewInit() {
    this.listenForScroll();
  }

  private listenForScroll() {
    this.scrollElements.forEach((element, index) => {
      element.addEventListener('scroll', (e) => {
        this.handleScroll(e, index);
      });
    });
  }

  private handleScroll(e: Event, index: number) {
    const target = e.target as HTMLDivElement;

    this.scrollElements
      .filter((_, i) => i !== index)
      .forEach((el) => {
        el.scrollLeft = target.scrollLeft;
      });
  }

  private get scrollElements() {
    return this.scrollTargetIds
      .map((id) => this._ref.nativeElement.querySelector(`#${id}`))
      .filter((element) => !!element) as Element[];
  }

  ngOnDestroy() {
    this.scrollElements.forEach((element, index) => {
      element.removeEventListener('scroll', (e) => {
        this.handleScroll(e, index);
      });
    });
  }
}
