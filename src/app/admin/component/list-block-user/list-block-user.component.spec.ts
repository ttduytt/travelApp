import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlockUserComponent } from './list-block-user.component';

describe('ListBlockUserComponent', () => {
  let component: ListBlockUserComponent;
  let fixture: ComponentFixture<ListBlockUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBlockUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBlockUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
