import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteThreeComponent } from './route-three.component';

describe('RouteThreeComponent', () => {
  let component: RouteThreeComponent;
  let fixture: ComponentFixture<RouteThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
