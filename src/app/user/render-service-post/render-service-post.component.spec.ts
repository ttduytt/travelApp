import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderServicePostComponent } from './render-service-post.component';

describe('RenderServicePostComponent', () => {
  let component: RenderServicePostComponent;
  let fixture: ComponentFixture<RenderServicePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderServicePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenderServicePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
