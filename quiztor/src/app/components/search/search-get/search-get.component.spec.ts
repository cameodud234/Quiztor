import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGetComponent } from './search-get.component';

describe('SearchGetComponent', () => {
  let component: SearchGetComponent;
  let fixture: ComponentFixture<SearchGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
