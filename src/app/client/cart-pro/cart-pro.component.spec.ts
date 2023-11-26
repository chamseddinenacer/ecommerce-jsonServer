import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProComponent } from './cart-pro.component';

describe('CartProComponent', () => {
  let component: CartProComponent;
  let fixture: ComponentFixture<CartProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
