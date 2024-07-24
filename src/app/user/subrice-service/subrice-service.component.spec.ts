import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubriceServiceComponent } from './subrice-service.component';

describe('SubriceServiceComponent', () => {
  let component: SubriceServiceComponent;
  let fixture: ComponentFixture<SubriceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubriceServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubriceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
