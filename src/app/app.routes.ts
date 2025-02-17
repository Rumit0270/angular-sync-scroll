import { Routes } from '@angular/router';
import { NativeScrollDemoComponent } from './components/native-scroll-demo/native-scroll-demo.component';
import { IscrollDemoComponent } from './components/iscroll-demo/iscroll-demo.component';

export const routes: Routes = [
  {
    path: 'iscroll',
    component: IscrollDemoComponent,
  },
  {
    path: '',
    component: NativeScrollDemoComponent,
  },
];
