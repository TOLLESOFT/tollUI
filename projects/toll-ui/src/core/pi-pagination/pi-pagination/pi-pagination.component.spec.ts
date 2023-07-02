import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiPaginationComponent } from './pi-pagination.component';

describe('PiPaginationComponent', () => {
  let component: PiPaginationComponent;
  let fixture: ComponentFixture<PiPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
