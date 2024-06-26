import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HompageUserComponent } from './hompage-user.component';

describe('HompageUserComponent', () => {
  let component: HompageUserComponent;
  let fixture: ComponentFixture<HompageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [HompageUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HompageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
