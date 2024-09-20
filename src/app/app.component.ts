import { RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

import { ScrollDirective } from './scroll/scroll.directive';
import { NativeScrollSyncDirective } from './directives/native-scoll-sync/native-scroll-sync.directive';
import { IscrollSyncDirective } from './directives/iscr0ll-sync/iscroll-sync.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScrollDirective,
    NativeScrollSyncDirective,
    IscrollSyncDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
