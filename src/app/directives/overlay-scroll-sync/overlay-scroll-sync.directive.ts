import {
  Input,
  QueryList,
  DestroyRef,
  Directive,
  ContentChildren,
} from '@angular/core';
import { OverlayScrollbars } from 'overlayscrollbars';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { OverlayScrollDirective } from '../overlay-scroll/overlay-scroll.directive';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-ngx';
import { throttleTime } from 'rxjs';

@Directive({
  selector: '[appOverlayScrollSync]',
  standalone: true,
})
export class OverlayScrollSyncDirective {
  // @ContentChildren(OverlayScrollDirective)
  // scrolls!: QueryList<OverlayScrollDirective>;

  @Input() scrollGroup: string[][] = [];

  @Input() syncAxis: 'both' | 'horizontal' | 'vertical' = 'both';

  @ContentChildren(OverlayScrollbarsComponent)
  overlayScrolls!: QueryList<OverlayScrollbarsComponent>;

  constructor(private _destroyRef: DestroyRef) {}

  ngAfterViewInit() {
    // this.listenForScroll();
    this.listenForOverlayScroll();
  }

  // private listenForScroll() {
  //   if (!this.scrolls || !this.scrolls.length) {
  //     return;
  //   }

  //   // Group the scroll based on ids first
  //   const scrollIdsInGroup = this.scrollGroup.reduce((acc, current) => {
  //     return [...acc, ...current];
  //   }, []);

  //   const scrollsWithoutGroup = this.scrolls.filter(
  //     ({ scrollId }) => !scrollIdsInGroup.includes(scrollId)
  //   );

  //   const scrollsWithGroup = this.scrollGroup.reduce((acc, group) => {
  //     const scrollGroup: OverlayScrollDirective[] = [];

  //     group.forEach((id) => {
  //       const scroll = this.scrolls.find(
  //         (directive) => directive.scrollId === id
  //       );

  //       if (scroll) {
  //         scrollGroup.push(scroll);
  //       }

  //       if (scrollGroup.length) {
  //         acc.push(scrollGroup);
  //       }
  //     });

  //     return acc;
  //   }, [] as OverlayScrollDirective[][]);

  //   this.listenForScrollInGroup(scrollsWithoutGroup);

  //   scrollsWithGroup.forEach((group) => {
  //     this.listenForScrollInGroup(group);
  //   });
  // }

  // private listenForScrollInGroup(scrollGroup: OverlayScrollDirective[]) {
  //   scrollGroup.forEach((directive) => {
  //     directive.scroll
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe(({ x, y }) => {
  //         scrollGroup
  //           .filter((d) => d !== directive)
  //           .forEach((d) => {
  //             const currentPosition = d.currentPosition;

  //             if (!currentPosition) {
  //               return;
  //             }

  //             const point = {
  //               x: currentPosition.scrollLeft,
  //               y: currentPosition.scrollTop,
  //             };

  //             if (this.syncAxis === 'horizontal') {
  //               // Horizontal scroll
  //               point.x = x;
  //             } else if (this.syncAxis === 'vertical') {
  //               // Vertical scroll
  //               point.y = y;
  //             } else {
  //               // Both
  //               point.x = x;
  //               point.y = y;
  //             }

  //             d.scrollTo(point);
  //           });
  //       });
  //   });
  // }

  //
  private listenForOverlayScroll() {
    if (!this.overlayScrolls || !this.overlayScrolls.length) {
      return;
    }

    const scrollIdsInGroup = this.scrollGroup.reduce((acc, current) => {
      return [...acc, ...current];
    }, []);

    const scrollsWithoutGroup = this.overlayScrolls.filter(
      (comp) => !scrollIdsInGroup.includes(comp.getElement().id)
    );

    const scrollsWithGroup = this.scrollGroup.reduce((acc, group) => {
      const scrollGroup: OverlayScrollbarsComponent[] = [];

      group.forEach((id) => {
        const scroll = this.overlayScrolls.find(
          (comp) => comp.getElement().id === id
        );

        if (scroll) {
          scrollGroup.push(scroll);
        }

        if (scrollGroup.length) {
          acc.push(scrollGroup);
        }
      });

      return acc;
    }, [] as OverlayScrollbarsComponent[][]);

    this.listenForScrollInOverlayScrollbarGroup(scrollsWithoutGroup);

    scrollsWithGroup.forEach((group) => {
      this.listenForScrollInOverlayScrollbarGroup(group);
    });
  }

  private listenForScrollInOverlayScrollbarGroup(
    scrollGroup: OverlayScrollbarsComponent[]
  ) {
    scrollGroup.forEach((comp) => {
      comp.onScroll
        .pipe(takeUntilDestroyed(this._destroyRef), throttleTime(10))
        .subscribe(([instance]) => {
          const scrollPosition = {
            x: instance.elements().viewport.scrollLeft,
            y: instance.elements().viewport.scrollTop,
          };

          scrollGroup
            .filter((c) => c !== comp && c.osInstance())
            .map((c) => c.osInstance())
            .forEach((osInstance) => {
              const { scrollLeft, scrollTop } = osInstance!.elements().viewport;

              const point = {
                x: scrollLeft,
                y: scrollTop,
              };

              if (this.syncAxis === 'horizontal') {
                // Horizontal scroll
                point.x = scrollPosition.x;
              } else if (this.syncAxis === 'vertical') {
                // Vertical scroll
                point.y = scrollPosition.y;
              } else {
                // Both
                point.x = scrollPosition.x;
                point.y = scrollPosition.y;
              }

              this.scrollToOverlayScrollbar(osInstance!, point);
            });
        });
    });
  }

  private scrollToOverlayScrollbar(
    instance: OverlayScrollbars,
    point: { x: number; y: number }
  ) {
    instance.elements().viewport.scrollTop = point.y;
    instance.elements().viewport.scrollLeft = point.x;
  }
}
