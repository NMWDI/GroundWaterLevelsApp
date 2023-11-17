import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleBoxComponent } from './page-title-box.component';

describe('PageTitleBoxComponent', () => {
  let component: PageTitleBoxComponent;
  let fixture: ComponentFixture<PageTitleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
