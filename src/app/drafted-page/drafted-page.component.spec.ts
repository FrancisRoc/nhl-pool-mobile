/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DraftedPageComponent } from './drafted-page.component';

describe('DraftedPageComponent', () => {
  let component: DraftedPageComponent;
  let fixture: ComponentFixture<DraftedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
