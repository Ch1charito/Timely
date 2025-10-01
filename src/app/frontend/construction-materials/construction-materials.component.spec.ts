import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionMaterialsComponent } from './construction-materials.component';

describe('ConstructionMaterialsComponent', () => {
  let component: ConstructionMaterialsComponent;
  let fixture: ComponentFixture<ConstructionMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
