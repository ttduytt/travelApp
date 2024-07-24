import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostCategoryComponent } from './list-post-category.component';

describe('ListPostCategoryComponent', () => {
  let component: ListPostCategoryComponent;
  let fixture: ComponentFixture<ListPostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPostCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
