import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcAdvTableComponent } from './tc-adv-table.component';

describe('TcAdvTableComponent', () => {
  let component: TcAdvTableComponent;
  let fixture: ComponentFixture<TcAdvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcAdvTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcAdvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
