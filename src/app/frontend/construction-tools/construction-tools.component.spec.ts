import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionToolsComponent } from './construction-tools.component';

describe('ConstructionToolsComponent', () => {
  let component: ConstructionToolsComponent;
  let fixture: ComponentFixture<ConstructionToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
