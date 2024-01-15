import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableCellComponent } from './datatable-cell.component';

describe('DatatableCellComponent', () => {
  let component: DatatableCellComponent;
  let fixture: ComponentFixture<DatatableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatatableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
