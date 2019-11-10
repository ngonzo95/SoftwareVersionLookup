import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserVersionInputComponent } from './user-version-input/user-version-input.component';
import { FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SoftwareListService } from './service/software-list.service';

@NgModule({
  declarations: [
    AppComponent,
    UserVersionInputComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [SoftwareListService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
