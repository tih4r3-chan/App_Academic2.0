import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLogPage } from './admin-log.page';

describe('AdminLogPage', () => {
  let component: AdminLogPage;
  let fixture: ComponentFixture<AdminLogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
