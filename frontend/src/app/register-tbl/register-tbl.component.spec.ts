import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTblComponent } from './register-tbl.component';

describe('RegisterTblComponent', () => {
  let component: RegisterTblComponent;
  let fixture: ComponentFixture<RegisterTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
