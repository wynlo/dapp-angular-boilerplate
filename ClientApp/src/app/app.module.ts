import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
} from '@angular/material';


// Routes ////////////////////////////////////////////////////
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';
import { DonationComponent} from './donation/donation.component';


@NgModule({
  declarations: [
    AppComponent,
    //////
    LandingComponent,
    AccountComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ///// ==================
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatToolbarModule,
    ///// ==================
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
