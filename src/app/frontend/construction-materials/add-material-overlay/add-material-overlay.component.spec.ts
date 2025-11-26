import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialOverlayComponent } from './add-material-overlay.component';

describe('AddMaterialOverlayComponent', () => {
  let component: AddMaterialOverlayComponent;
  let fixture: ComponentFixture<AddMaterialOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterialOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaterialOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
