import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTblComponent } from './production-tbl.component';

describe('ProductionTblComponent', () => {
  let component: ProductionTblComponent;
  let fixture: ComponentFixture<ProductionTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionTblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
