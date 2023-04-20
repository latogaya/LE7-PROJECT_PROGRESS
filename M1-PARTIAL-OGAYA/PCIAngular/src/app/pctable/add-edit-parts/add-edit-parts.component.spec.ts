import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPartsComponent } from './add-edit-parts.component';

describe('AddEditPartsComponent', () => {
  let component: AddEditPartsComponent;
  let fixture: ComponentFixture<AddEditPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});