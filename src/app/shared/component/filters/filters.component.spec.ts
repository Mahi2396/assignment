import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFilterClick', () => {
    it('Should emit correct selcted option value', () => {
      const FILTER_VALUE = 2008;
      spyOn(component.itemClick, 'emit');
      component.onFilterClick(FILTER_VALUE);
      expect(component.itemClick.emit).toHaveBeenCalledTimes(1);
      expect(component.isSelectedItem).toEqual(FILTER_VALUE);
    });
  });
});
