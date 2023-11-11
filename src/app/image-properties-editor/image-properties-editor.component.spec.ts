import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePropertiesEditorComponent } from './image-properties-editor.component';

describe('ImagePropertiesEditorComponent', () => {
  let component: ImagePropertiesEditorComponent;
  let fixture: ComponentFixture<ImagePropertiesEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePropertiesEditorComponent]
    });
    fixture = TestBed.createComponent(ImagePropertiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
