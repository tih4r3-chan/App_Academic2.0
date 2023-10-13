import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesVerPage } from './clases-ver.page';

describe('ClasesVerPage', () => {
  let component: ClasesVerPage;
  let fixture: ComponentFixture<ClasesVerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClasesVerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
