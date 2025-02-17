import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeScrollDemoComponent } from './native-scroll-demo.component';

describe('NativeScrollDemoComponent', () => {
  let component: NativeScrollDemoComponent;
  let fixture: ComponentFixture<NativeScrollDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeScrollDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeScrollDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
