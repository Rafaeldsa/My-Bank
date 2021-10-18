import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExtratoComponent } from './modal-extrato.component';

describe('ModalExtratoComponent', () => {
  let component: ModalExtratoComponent;
  let fixture: ComponentFixture<ModalExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExtratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
