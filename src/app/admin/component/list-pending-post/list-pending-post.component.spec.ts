import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPendingPostComponent } from './list-pending-post.component';

describe('ListPendingPostComponent', () => {
  let component: ListPendingPostComponent;
  let fixture: ComponentFixture<ListPendingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPendingPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPendingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
