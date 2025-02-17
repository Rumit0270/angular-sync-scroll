import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscrollDemoComponent } from './iscroll-demo.component';

describe('IscrollDemoComponent', () => {
  let component: IscrollDemoComponent;
  let fixture: ComponentFixture<IscrollDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IscrollDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IscrollDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
