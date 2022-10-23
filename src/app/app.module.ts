import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AddProductComponent } from './add-product/add-product.component';
import {RatingModule} from "ngx-bootstrap/rating";
import {ProductModule} from "./products/product.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
      BsDatepickerModule.forRoot(),
      RatingModule.forRoot(),
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
      ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
