import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaDPage } from './cuenta-d.page';

describe('CuentaDPage', () => {
  let component: CuentaDPage;
  let fixture: ComponentFixture<CuentaDPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CuentaDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
