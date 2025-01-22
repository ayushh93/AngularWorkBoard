import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoIndexComponent } from './to-do-index.component';

describe('ToDoIndexComponent', () => {
  let component: ToDoIndexComponent;
  let fixture: ComponentFixture<ToDoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
