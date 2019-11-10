import { TestBed, getTestBed } from '@angular/core/testing';

import { SoftwareListService } from './software-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Software } from '../model/software';

describe('SoftwareListService', () => {
  let injector: TestBed;
  let service: SoftwareListService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SoftwareListService]
    })
    injector = getTestBed();
    service = injector.get(SoftwareListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: SoftwareListService = TestBed.get(SoftwareListService);
    expect(service).toBeTruthy();
  });

  it('should connect to the api and update the SoftwareList subscribers when updateList is called', (done) => {
    //setup our subscribers
    let softwareList = [new Software('MS Word', '13.2.1'),
                        new Software('MS Excel', '13.4.2'),
                        new Software('Angular', '8.1.13'),
                        new Software('DataGrip', '2019.2.6')]
    setupSubscribers(softwareList, false, done, service)

    //act
    service.update("9.3.7")

    let req = httpMock.expectOne(service.API_URL + '/software-gerater-than')
    expect(req.request.body).toEqual({ "version": "9.3.7" })
    req.flush(mockSoftware)

  })

  it('should set softwareList to empty and set error to true when it recieves a 4xx', (done) => {
    //setup our subscriber
    setupSubscribers([], true, done, service)

    //act
    service.update("9.3.7")
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    let req = httpMock.expectOne(service.API_URL + '/software-gerater-than')
    expect(req.request.body).toEqual({ "version": "9.3.7" })
    req.flush({ "error-message": "some error" }, mockErrorResponse)

  })

});

//Helper function to setup the subscribers we need to monitor the BehaviorSubjects
function setupSubscribers(expectedList, expectedErrorOccured, done, service) {

  //Create function to determine when both dones are called
  let numberOfDones = 0
  function oneDone() {
    numberOfDones++
    if (numberOfDones == 2) {
      done()
    }
  }

  //setup list subscriber
  let softwareCallCount = 0
  service.softwareList.subscribe((softwareList: Software[]) => {
    softwareCallCount++
    if (softwareCallCount == 1) {
      expect(softwareList).toEqual([])
    }

    if (softwareCallCount == 2) {
      expect(softwareList).toEqual(expectedList)
      oneDone();
    }
  });

  //setup error subscriber
  let errorCallCount = 0
  service.apiErrorOccured.subscribe((error: boolean) => {
    errorCallCount++
    if (errorCallCount == 1) {
      expect(error).toEqual(false)
    }

    if (errorCallCount == 2) {
      expect(error).toEqual(expectedErrorOccured)
      oneDone();
    }
  });
}

let mockSoftware = {
  "softwares": [
    {
      "name": "MS Word",
      "version": "13.2.1"
    },
    {
      "name": "MS Excel",
      "version": "13.4.2"
    },
    {
      "name": "Angular",
      "version": "8.1.13"
    },
    {
      "name": "DataGrip",
      "version": "2019.2.6"
    }
  ]
}
