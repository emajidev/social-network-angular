import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysPostsComponent } from './sys-posts.component';

describe('SysPostsComponent', () => {
  let component: SysPostsComponent;
  let fixture: ComponentFixture<SysPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
