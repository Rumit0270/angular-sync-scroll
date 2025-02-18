import { Routes } from '@angular/router';
import { NativeScrollDemoComponent } from './components/native-scroll-demo/native-scroll-demo.component';
import { IscrollDemoComponent } from './components/iscroll-demo/iscroll-demo.component';
import { OverlayScrollbarDemoComponent } from './components/overlay-scrollbar-demo/overlay-scrollbar-demo.component';

export const routes: Routes = [
  {
    path: 'iscroll',
    component: IscrollDemoComponent,
  },
  {
    path: 'overlay-scrollbar',
    component: OverlayScrollbarDemoComponent,
  },
  {
    path: '',
    component: NativeScrollDemoComponent,
  },
];
