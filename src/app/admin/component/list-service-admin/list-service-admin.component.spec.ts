import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceAdminComponent } from './list-service-admin.component';

describe('ListServiceAdminComponent', () => {
  let component: ListServiceAdminComponent;
  let fixture: ComponentFixture<ListServiceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListServiceAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListServiceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
