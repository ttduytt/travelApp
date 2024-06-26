import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPostComponent } from './content-post.component';

describe('ContentPostComponent', () => {
  let component: ContentPostComponent;
  let fixture: ComponentFixture<ContentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
