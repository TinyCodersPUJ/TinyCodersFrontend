import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesM6Component } from './pages-m6.component';

describe('PagesM6Component', () => {
  let component: PagesM6Component;
  let fixture: ComponentFixture<PagesM6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesM6Component]
    });
    fixture = TestBed.createComponent(PagesM6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
