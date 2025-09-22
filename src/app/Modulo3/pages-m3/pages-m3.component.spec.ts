import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesM3Component } from './pages-m3.component';

describe('PagesM3Component', () => {
  let component: PagesM3Component;
  let fixture: ComponentFixture<PagesM3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesM3Component]
    });
    fixture = TestBed.createComponent(PagesM3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
