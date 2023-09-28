import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidePasswordPage } from './olvide-password.page';

describe('OlvidePasswordPage', () => {
  let component: OlvidePasswordPage;
  let fixture: ComponentFixture<OlvidePasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
