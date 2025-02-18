import {
  ContentChildren,
  DestroyRef,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { OverlayScrollDirective } from '../overlay-scroll/overlay-scroll.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appOverlayScrollSync]',
  standalone: true,
})
export class OverlayScrollSyncDirective {
  @ContentChildren(OverlayScrollDirective)
  scrolls!: QueryList<OverlayScrollDirective>;

  @Input() scrollGroup: string[][] = [];

  @Input() syncAxis: 'both' | 'horizontal' | 'vertical' = 'both';

  constructor(private _destroyRef: DestroyRef) {}

  ngAfterViewInit() {
    this.listenForScroll();
  }

  private listenForScroll() {
    if (!this.scrolls || !this.scrolls.length) {
      return;
    }

    // Group the scroll based on ids first
    const scrollIdsInGroup = this.scrollGroup.reduce((acc, current) => {
      return [...acc, ...current];
    }, []);

    const scrollsWithoutGroup = this.scrolls.filter(
      ({ scrollId }) => !scrollIdsInGroup.includes(scrollId)
    );

    const scrollsWithGroup = this.scrollGroup.reduce((acc, group) => {
      const scrollGroup: OverlayScrollDirective[] = [];

      group.forEach((id) => {
        const scroll = this.scrolls.find(
          (directive) => directive.scrollId === id
        );

        if (scroll) {
          scrollGroup.push(scroll);
        }

        if (scrollGroup.length) {
          acc.push(scrollGroup);
        }
      });

      return acc;
    }, [] as OverlayScrollDirective[][]);

    this.listenForScrollInGroup(scrollsWithoutGroup);

    scrollsWithGroup.forEach((group) => {
      this.listenForScrollInGroup(group);
    });
  }

  private listenForScrollInGroup(scrollGroup: OverlayScrollDirective[]) {
    scrollGroup.forEach((directive) => {
      directive.scroll
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(({ x, y }) => {
          let point = { x: 0, y: 0 };

          if (this.syncAxis === 'horizontal') {
            // Horizontal scroll
            point = {
              x: x,
              y: 0,
            };
          } else if (this.syncAxis === 'vertical') {
            // Vertical scroll
            point = {
              x: 0,
              y: y,
            };
          } else {
            // Both
            point = {
              x,
              y,
            };
          }

          scrollGroup
            .filter((d) => d !== directive)
            .forEach((d) => {
              d.scrollTo(point);
              // d.scrollTo(point);
              // d.refresh();
            });
        });
    });
  }
}
