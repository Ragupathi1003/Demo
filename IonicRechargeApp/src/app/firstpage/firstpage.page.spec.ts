import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstpagePage } from './firstpage.page';

describe('FirstpagePage', () => {
  let component: FirstpagePage;
  let fixture: ComponentFixture<FirstpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
