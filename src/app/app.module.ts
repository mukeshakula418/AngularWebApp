import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import {ProductListComponent} from "./products/product-list.component";
import {ProductDetailComponent} from "./products/product-detail.component";
import {ConvertToSpacesPipe} from "./shared/convert-to-spaces.pipe";
import {StarComponent} from "./shared/star.component";
import {ProductDetailGuard} from "./products/product-detail.guard";
import { AddProductComponent } from './add-product/add-product.component';
import {RatingModule} from "ngx-bootstrap/rating";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
      ProductListComponent,
      ConvertToSpacesPipe,
      StarComponent,
      AddProductComponent,
  ],
  imports: [
    BrowserModule,
      FormsModule,
    HttpClientModule,
      BsDatepickerModule.forRoot(),
      RatingModule.forRoot(),
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
