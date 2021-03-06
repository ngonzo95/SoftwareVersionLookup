import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SoftwareListService } from '../service/software-list.service';

@Component({
  selector: 'app-user-version-input',
  templateUrl: './user-version-input.component.html',
  styleUrls: ['./user-version-input.component.css']
})
export class UserVersionInputComponent implements OnInit {
  private _userInput: string
  private _inputIsValid: boolean = false

  @Output()
  userInputChange = new EventEmitter<string>()
  @Output()
  inputIsValidChange = new EventEmitter<boolean>()

  constructor(private listService: SoftwareListService) { }
  ngOnInit() { }

  @Input()
  get userInput(): string {
    return this._userInput
  }

  set userInput(input: string) {
    this._userInput = input
    this.inputIsValid = this.checkIfValidInput(this._userInput)
    this.userInputChange.emit(this._userInput)
  }

  @Input()
  get inputIsValid(): boolean {
    return this._inputIsValid
  }
  set inputIsValid(isValid: boolean) {
    this._inputIsValid = isValid
    this.inputIsValidChange.emit(this._inputIsValid)
  }

  checkIfValidInput(input: string): boolean {
    let regex: RegExp = new RegExp('^(\\d+(.\\d+)?(.\\d+)?)$')
    return regex.test(input)
  }

  submit(){
    if (this.inputIsValid){
      this.listService.update(this.userInput)
    }
  }
}
