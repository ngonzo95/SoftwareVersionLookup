import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVersionInputComponent } from './user-version-input.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('UserVersionInputComponent', () => {
  let component: UserVersionInputComponent;
  let fixture: ComponentFixture<UserVersionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [UserVersionInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVersionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When a good version is entered submit button should be viewable', async() => {
    await fixture.whenStable();
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('#versionInput')).nativeElement

    inputElement.value = '10.2.4';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.userInput).toEqual('10.2.4');
    const buttonElement = fixture.debugElement.query(By.css('#submitVersion')).nativeElement
    expect(buttonElement.disabled).toBeFalsy()
  });

  it('When a bad version is entered submit button should not be viewable', async() => {
    await fixture.whenStable();
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('#versionInput')).nativeElement

    inputElement.value = '10.2.4x';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.userInput).toEqual('10.2.4x');
    const buttonElement = fixture.debugElement.query(By.css('#submitVersion')).nativeElement
    expect(buttonElement.disabled).toBeTruthy()
  });

  it('Regex works as expected', () =>{
    expect(component.checkIfValidInput("10")).toBeTruthy()
    expect(component.checkIfValidInput("10.5")).toBeTruthy()
    expect(component.checkIfValidInput("10.2.4")).toBeTruthy()

    expect(component.checkIfValidInput("")).toBeFalsy()
    expect(component.checkIfValidInput("102d")).toBeFalsy()
    expect(component.checkIfValidInput("10.2342d")).toBeFalsy()
    expect(component.checkIfValidInput("10.2.4.5")).toBeFalsy()


  })
});
