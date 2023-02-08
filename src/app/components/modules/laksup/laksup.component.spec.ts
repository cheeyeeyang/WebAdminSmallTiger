import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaksupComponent } from './laksup.component';

describe('LaksupComponent', () => {
  let component: LaksupComponent;
  let fixture: ComponentFixture<LaksupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaksupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaksupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
