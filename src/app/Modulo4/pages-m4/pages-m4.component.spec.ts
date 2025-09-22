import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesM4Component } from './pages-m4.component';

describe('PagesM4Component', () => {
  let component: PagesM4Component;
  let fixture: ComponentFixture<PagesM4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesM4Component]
    });
    fixture = TestBed.createComponent(PagesM4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
