import {
  Input,
  Output,
  OnInit,
  Directive,
  OnDestroy,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import {
  OverlayScrollbars,
  Options as OverlayScrollbarsOptions,
} from 'overlayscrollbars';

@Directive({
  selector: '[appOverlayScroll]',
  standalone: true,
})
export class OverlayScrollDirective implements OnInit, OnDestroy {
  @Input({ required: true }) scrollId!: string;
  @Input() syncAxis: 'both' | 'horizontal' | 'vertical' = 'both';
  @Input() options?: Partial<OverlayScrollbarsOptions> = {};

  @Output() scroll = new EventEmitter<{ x: number; y: number }>();

  private osInstance?: OverlayScrollbars;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initializeScroll();
  }

  private initializeScroll() {
    let x = 'scroll';
    let y = 'scroll';

    if (this.syncAxis === 'horizontal') {
      y = 'hidden';
    } else if (this.syncAxis === 'vertical') {
      x = 'hidden';
    }

    const defaultOptions: any = {
      scrollbars: {
        autoHide: 'never',
        autoHideDelay: 400,
        clickScroll: true,
        dragScroll: true,
      },
      overflow: {
        x,
        y,
      },
    };

    this.osInstance = OverlayScrollbars(this.elementRef.nativeElement, {
      ...defaultOptions,
      ...this.options,
    });

    this.osInstance.on('scroll', (instance) => {
      const position = {
        x: instance.elements().viewport.scrollLeft,
        y: instance.elements().viewport.scrollTop,
      };

      this.scroll.emit(position);
    });
  }

  public get currentPosition() {
    if (!this.osInstance) {
      return null;
    }

    const { scrollLeft, scrollTop } = this.osInstance.elements().viewport;

    return {
      scrollLeft,
      scrollTop,
    };
  }

  public scrollTo(point: { x: number; y: number }) {
    if (this.osInstance) {
      this.osInstance.elements().viewport.scrollTop = point.y;
      this.osInstance.elements().viewport.scrollLeft = point.x;
    }
  }

  ngOnDestroy() {
    if (this.osInstance) {
      this.osInstance.destroy();
    }
  }
}
