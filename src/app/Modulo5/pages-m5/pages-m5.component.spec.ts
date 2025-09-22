import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesM5Component } from './pages-m5.component';

describe('PagesM5Component', () => {
  let component: PagesM5Component;
  let fixture: ComponentFixture<PagesM5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesM5Component]
    });
    fixture = TestBed.createComponent(PagesM5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
