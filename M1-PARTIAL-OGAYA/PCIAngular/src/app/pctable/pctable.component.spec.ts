import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PctableComponent } from './pctable.component';

describe('PctableComponent', () => {
  let component: PctableComponent;
  let fixture: ComponentFixture<PctableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PctableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PctableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
