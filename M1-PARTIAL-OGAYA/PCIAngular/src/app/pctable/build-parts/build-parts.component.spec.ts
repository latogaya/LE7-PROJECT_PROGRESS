import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPartsComponent } from './build-parts.component';

describe('BuildPartsComponent', () => {
  let component: BuildPartsComponent;
  let fixture: ComponentFixture<BuildPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
