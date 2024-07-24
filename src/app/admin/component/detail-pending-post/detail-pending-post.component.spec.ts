import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPendingPostComponent } from './detail-pending-post.component';

describe('DetailPendingPostComponent', () => {
  let component: DetailPendingPostComponent;
  let fixture: ComponentFixture<DetailPendingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPendingPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPendingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
