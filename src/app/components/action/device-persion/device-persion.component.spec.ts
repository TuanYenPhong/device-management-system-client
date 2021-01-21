import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePersionComponent } from './device-persion.component';

describe('DevicePersionComponent', () => {
  let component: DevicePersionComponent;
  let fixture: ComponentFixture<DevicePersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
