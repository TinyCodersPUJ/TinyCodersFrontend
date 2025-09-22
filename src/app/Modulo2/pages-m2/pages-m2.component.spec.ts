import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesM2Component } from './pages-m2.component';

describe('PagesM2Component', () => {
  let component: PagesM2Component;
  let fixture: ComponentFixture<PagesM2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesM2Component]
    });
    fixture = TestBed.createComponent(PagesM2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
