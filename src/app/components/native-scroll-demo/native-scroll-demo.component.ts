import { Component } from '@angular/core';
import { NativeScrollSyncDirective } from '../../directives/native-scoll-sync/native-scroll-sync.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-native-scroll-demo',
  standalone: true,
  imports: [NativeScrollSyncDirective, CommonModule],
  templateUrl: './native-scroll-demo.component.html',
  styleUrl: './native-scroll-demo.component.less',
})
export class NativeScrollDemoComponent {
  items = Array.from({ length: 50 }).map((_, i) => `#${i + 1}`);
}
