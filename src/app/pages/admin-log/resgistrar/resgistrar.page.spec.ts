import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResgistrarPage } from './resgistrar.page';

describe('ResgistrarPage', () => {
  let component: ResgistrarPage;
  let fixture: ComponentFixture<ResgistrarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResgistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
