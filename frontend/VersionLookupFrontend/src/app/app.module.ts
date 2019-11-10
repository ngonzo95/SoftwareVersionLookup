import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserVersionInputComponent } from './user-version-input/user-version-input.component';
import { FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SoftwareListService } from './service/software-list.service';
import { SoftwareListComponent } from './software-list/software-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    UserVersionInputComponent,
    SoftwareListComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    BrowserAnimationsModule, MatTableModule
  ],
  providers: [SoftwareListService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
