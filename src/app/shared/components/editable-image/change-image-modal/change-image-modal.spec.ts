import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImageModalComponent } from './change-image-modal';

describe('ChangeImageModalComponent', () => {
  let component: ChangeImageModalComponent;
  let fixture: ComponentFixture<ChangeImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeImageModalComponent]
    });
    fixture = TestBed.createComponent(ChangeImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
