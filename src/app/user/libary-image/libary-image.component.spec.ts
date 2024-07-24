import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibaryImageComponent } from './libary-image.component';

describe('LibaryImageComponent', () => {
  let component: LibaryImageComponent;
  let fixture: ComponentFixture<LibaryImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibaryImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibaryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
