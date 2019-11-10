import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareListComponent } from './software-list.component';
import { SoftwareListService } from '../service/software-list.service';
import { Software } from '../model/software';
import { BehaviorSubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('SoftwareListComponent', () => {
  let component: SoftwareListComponent;
  let fixture: ComponentFixture<SoftwareListComponent>;
  let mock: MockListService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ SoftwareListComponent ],
      providers: [{provide: SoftwareListService, useClass: MockListService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mock = TestBed.get(SoftwareListService)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should be subscribed to the list service', () => {
    expect(component.softwareList).toEqual([])
    expect(component.errorWhileRetrievingList).toBe(false)

    mock.softwareList.next([new Software("a","2")])
    mock.apiErrorOccured.next(true)
    fixture.detectChanges();

    expect(component.softwareList).toEqual([new Software("a","2")])
    expect(component.errorWhileRetrievingList).toBe(true)


  })
});

class MockListService{
  softwareList: BehaviorSubject<Software[]> = new BehaviorSubject([])
  apiErrorOccured: BehaviorSubject<boolean> = new BehaviorSubject(false)
}
