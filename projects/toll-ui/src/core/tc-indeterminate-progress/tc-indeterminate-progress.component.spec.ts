import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcIndeterminateProgressComponent } from './tc-indeterminate-progress.component';

describe('TcIndeterminateProgressComponent', () => {
  let component: TcIndeterminateProgressComponent;
  let fixture: ComponentFixture<TcIndeterminateProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcIndeterminateProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcIndeterminateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
