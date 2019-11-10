import { Component, OnInit } from '@angular/core';
import { SoftwareListService } from '../service/software-list.service';
import { Software } from '../model/software';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css']
})
export class SoftwareListComponent implements OnInit {
  softwareList: Software[] = []
  errorWhileRetrievingList: boolean = false
  columnsToDisplay: string[] = ["name", "version"]
  constructor(private listService: SoftwareListService) { }

  ngOnInit() {
    this.listService.softwareList.subscribe((list: Software[]) => {
      this.softwareList = list
    })

    this.listService.apiErrorOccured.subscribe((hasError:boolean) =>{
      this.errorWhileRetrievingList = hasError
    })

  }

}
