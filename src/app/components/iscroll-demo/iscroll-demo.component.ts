import { Component } from '@angular/core';
import { ScrollDirective } from '../../directives/scroll/scroll.directive';
import { IscrollSyncDirective } from '../../directives/iscr0ll-sync/iscroll-sync.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iscroll-demo',
  standalone: true,
  imports: [ScrollDirective, IscrollSyncDirective, CommonModule],
  templateUrl: './iscroll-demo.component.html',
  styleUrl: './iscroll-demo.component.less',
})
export class IscrollDemoComponent {
  items = Array.from({ length: 50 }).map((_, i) => `#${i + 1}`);
}
