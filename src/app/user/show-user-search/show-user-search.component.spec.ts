import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserSearchComponent } from './show-user-search.component';

describe('ShowUserSearchComponent', () => {
  let component: ShowUserSearchComponent;
  let fixture: ComponentFixture<ShowUserSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
