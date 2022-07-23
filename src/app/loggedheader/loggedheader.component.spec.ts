import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedheaderComponent } from './loggedheader.component';

describe('LoggedheaderComponent', () => {
  let component: LoggedheaderComponent;
  let fixture: ComponentFixture<LoggedheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
