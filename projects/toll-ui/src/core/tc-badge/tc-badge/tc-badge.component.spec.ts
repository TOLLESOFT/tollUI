import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcBadgeComponent } from './tc-badge.component';

describe('TcBadgeComponent', () => {
  let component: TcBadgeComponent;
  let fixture: ComponentFixture<TcBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
