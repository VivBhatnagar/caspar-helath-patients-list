import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: any;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit first page on ngOnChanges', () => {
    spyOn(component.onPageChange, 'emit');
    component.totalRecords = 20;
    component.recordsPerPage = 5;
    component.ngOnChanges();
    expect(component.pages).toEqual([1, 2, 3, 4]);
    expect(component.activePage).toBe(1);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should calculate total number of pages correctly', () => {
    component.totalRecords = 20;
    component.recordsPerPage = 5;
    const pageCount = component.getPageCount();
    expect(pageCount).toBe(4);
  });

  it('should generate an array of page numbers', () => {
    const pageArray = component.getArrayOfPage(4);
    expect(pageArray).toEqual([1, 2, 3, 4]);
  });

  it('should emit the correct page number on page click', () => {
    spyOn(component.onPageChange, 'emit');
    component.totalRecords = 20;
    component.recordsPerPage = 5;
    component.ngOnChanges();
    component.onClickPage(2);
    expect(component.activePage).toBe(2);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
  });
});
