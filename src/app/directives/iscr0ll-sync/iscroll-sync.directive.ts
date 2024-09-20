import {
  Input,
  QueryList,
  Directive,
  DestroyRef,
  ContentChildren,
} from '@angular/core';
import { ScrollDirective } from '../../scroll/scroll.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIscrollSync]',
  standalone: true,
})
export class IscrollSyncDirective {
  @ContentChildren(ScrollDirective)
  scrollDirectives!: QueryList<ScrollDirective>;

  @Input() scrollGroup: string[][] = [];

  constructor(private _destroyRef: DestroyRef) {}

  ngAfterViewInit() {
    this.listenForScroll();
  }

  private listenForScroll() {
    if (!this.scrollDirectives || !this.scrollDirectives.length) {
      return;
    }

    // Group the scroll based on ids first
    const scrollIdsInGroup = this.scrollGroup.reduce((acc, current) => {
      return [...acc, ...current];
    }, []);

    const scrollsWithoutGroup = this.scrollDirectives.filter(
      ({ scrollId }) => !scrollId || !scrollIdsInGroup.includes(scrollId)
    );

    const scrollsWithGroup = this.scrollGroup.reduce((acc, group) => {
      const scrollGroup: ScrollDirective[] = [];

      group.forEach((id) => {
        const scroll = this.scrollDirectives.find(
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
    }, [] as ScrollDirective[][]);

    this.listenForScrollInGroup(scrollsWithoutGroup);

    scrollsWithGroup.forEach((group) => {
      this.listenForScrollInGroup(group);
    });

    // this.scrollDirectives.forEach((directive) => {
    //   console.log(directive.scrollId);

    //   directive.scroll
    //     .pipe(takeUntilDestroyed(this._destroyRef))
    //     .subscribe((scroll) => {
    //       // Horizontal scroll

    //       const point = {
    //         x: scroll.x,
    //         y: 0,
    //       };

    //       this.scrollDirectives
    //         .filter((d) => d !== directive)
    //         .forEach((d) => {
    //           d.scrollTo(point);
    //           d.refresh();
    //         });
    //     });
    // });
  }

  private listenForScrollInGroup(scrollGroup: ScrollDirective[]) {
    scrollGroup.forEach((directive) => {
      directive.scroll
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((scroll) => {
          // Horizontal scroll
          const point = {
            x: scroll.x,
            y: 0,
          };

          scrollGroup
            .filter((d) => d !== directive)
            .forEach((d) => {
              d.scrollTo(point);
              d.refresh();
            });
        });
    });
  }
}
