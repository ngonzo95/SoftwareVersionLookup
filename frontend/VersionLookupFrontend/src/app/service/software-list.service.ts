import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Software } from '../model/software';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SoftwareListService {
  softwareList: BehaviorSubject<Software[]> = new BehaviorSubject([])
  apiErrorOccured: BehaviorSubject<Boolean> = new BehaviorSubject(false)

  readonly API_URL: string = "http://localhost:5000"
  constructor(private http: HttpClient) { }

  //Service method to update the software List
  update(version: string) {
    let url: string = this.API_URL + "/software-gerater-than"
    this.http.post(url, { "version": version }).subscribe(
      responseJson => this._apiSuccess(responseJson),
      error => this._apiError(error))
  }

  //helper method to run the sucess path
  private _apiSuccess(responseJson: any){
    let listFromResponse = this.convertResponeIntoSoftwareList(responseJson)
    this.softwareList.next(listFromResponse)
    this.apiErrorOccured.next(false)
  }

  //helper method to run the error path
  private _apiError(error: any){
    console.log(error)
    this.softwareList.next([])
    this.apiErrorOccured.next(true)

  }

  //helper method to conver the api response into a list of software
  convertResponeIntoSoftwareList(responeJson): Software[] {
    let softwareListFromResponse: Software[] = []
    for (let softwareJson of responeJson['softwares']) {
      softwareListFromResponse
        .push(new Software(softwareJson['name'], softwareJson['version']))
    }
    return softwareListFromResponse
  }
}
