import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoinStatisticalComponent } from './poin-statistical.component';

describe('PoinStatisticalComponent', () => {
  let component: PoinStatisticalComponent;
  let fixture: ComponentFixture<PoinStatisticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoinStatisticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoinStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
