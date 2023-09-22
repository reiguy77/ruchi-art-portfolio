import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideEditorComponent } from './side-editor.component';

describe('SideEditorComponent', () => {
  let component: SideEditorComponent;
  let fixture: ComponentFixture<SideEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideEditorComponent]
    });
    fixture = TestBed.createComponent(SideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
