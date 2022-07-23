import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplynowComponent } from './applynow.component';

describe('ApplynowComponent', () => {
  let component: ApplynowComponent;
  let fixture: ComponentFixture<ApplynowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplynowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
