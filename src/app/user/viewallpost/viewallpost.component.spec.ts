import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallpostComponent } from './viewallpost.component';

describe('ViewallpostComponent', () => {
  let component: ViewallpostComponent;
  let fixture: ComponentFixture<ViewallpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewallpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewallpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
