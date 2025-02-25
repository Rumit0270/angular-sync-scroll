import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayScrollDirective } from '../../directives/overlay-scroll/overlay-scroll.directive';
import { OverlayScrollSyncDirective } from '../../directives/overlay-scroll-sync/overlay-scroll-sync.directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@Component({
  selector: 'app-overlay-scrollbar-demo',
  standalone: true,
  imports: [
    CommonModule,
    OverlayScrollDirective,
    OverlayScrollSyncDirective,
    OverlayscrollbarsModule,
  ],
  templateUrl: './overlay-scrollbar-demo.component.html',
  styleUrl: './overlay-scrollbar-demo.component.less',
})
export class OverlayScrollbarDemoComponent {
  items = Array.from({ length: 50 }).map((_, i) => `#${i + 1}`);

  tableData = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => `Cell ${i}-${j}`)
  );
}
