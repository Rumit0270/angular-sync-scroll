import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDirective } from './scroll.directive';

@Component({
  template: `
    <div appScroll>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  `,
})
class TestComponent {}

describe('ScrollDirective', () => {
  let directive: ScrollDirective;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const mockElement = document.createElement('div');

  const mockElementRef: any = {
    nativeElement: mockElement,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ScrollDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    directive = new ScrollDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should be able to query dom with by directive', () => {
    const scroll = fixture.debugElement.query(By.directive(ScrollDirective));
    fixture.detectChanges();
    expect(scroll).toBeDefined();
  });
});
