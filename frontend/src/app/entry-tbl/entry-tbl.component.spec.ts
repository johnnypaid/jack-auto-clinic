import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTblComponent } from './entry-tbl.component';

describe('EntryTblComponent', () => {
  let component: EntryTblComponent;
  let fixture: ComponentFixture<EntryTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryTblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
