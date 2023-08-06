import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcRadioGroupComponent } from './tc-radio-group.component';

describe('TcRadioGroupComponent', () => {
  let component: TcRadioGroupComponent;
  let fixture: ComponentFixture<TcRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcRadioGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
