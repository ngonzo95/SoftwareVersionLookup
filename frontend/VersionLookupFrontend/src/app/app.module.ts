import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserVersionInputComponent } from './user-version-input/user-version-input.component';
import { FormsModule, } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserVersionInputComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
