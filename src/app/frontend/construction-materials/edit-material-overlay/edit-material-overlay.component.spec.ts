import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterialOverlayComponent } from './edit-material-overlay.component';

describe('EditMaterialOverlayComponent', () => {
  let component: EditMaterialOverlayComponent;
  let fixture: ComponentFixture<EditMaterialOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMaterialOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMaterialOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
