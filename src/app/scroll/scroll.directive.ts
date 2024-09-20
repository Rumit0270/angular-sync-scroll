import {
  Input,
  Directive,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
// @ts-ignore
import IScroll from 'iscroll/build/iscroll-probe';

@Directive({
  selector: '[appScroll]',
  standalone: true,
})
export class ScrollDirective implements AfterViewInit, OnDestroy {
  private _timeoutRef: any;
  private _scroll: any;

  @Input() scrollId?: string;
  @Input() options: Record<string, any> = {};
  @Output() scroll = new EventEmitter<any>();

  constructor(private _ref: ElementRef) {}

  ngAfterViewInit(): void {
    this.initializeScrollbar();
  }

  ngOnDestroy(): void {
    if (this._timeoutRef) {
      clearTimeout(this._timeoutRef);
    }

    if (this._scroll) {
      this._scroll.destroy();
      this._scroll = null;
    }
  }

  private initializeScrollbar() {
    this._scroll = new IScroll(this._ref.nativeElement, {
      scrollbars: true,
      mouseWheel: true,
      hideScrollbar: false,
      snap: false,
      momentum: true,
      ...this.options,
      probeType: 3,
    });

    this._scroll.on('scroll', () => {
      this.scroll.emit(this._scroll);
    });
  }

  refresh(delay = 0) {
    this._timeoutRef = setTimeout(() => {
      this._scroll?.refresh();
    }, delay);
  }

  scrollTo(point: { x: number; y: number }) {
    this._scroll?.scrollTo(point.x, point.y);
  }
}
