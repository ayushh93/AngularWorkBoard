import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoDetailComponent } from './to-do-detail.component';

describe('ToDoDetailComponent', () => {
  let component: ToDoDetailComponent;
  let fixture: ComponentFixture<ToDoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
