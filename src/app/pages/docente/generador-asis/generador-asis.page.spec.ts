import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneradorAsisPage } from './generador-asis.page';

describe('GeneradorAsisPage', () => {
  let component: GeneradorAsisPage;
  let fixture: ComponentFixture<GeneradorAsisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneradorAsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
