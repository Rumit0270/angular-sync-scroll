import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayScrollbarDemoComponent } from './overlay-scrollbar-demo.component';

describe('OverlayScrollbarDemoComponent', () => {
  let component: OverlayScrollbarDemoComponent;
  let fixture: ComponentFixture<OverlayScrollbarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayScrollbarDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayScrollbarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
