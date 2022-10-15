import {Component, OnInit} from '@angular/core';
import { AddProduct } from "./add-product";
import {Observable} from "rxjs";
import { IProduct } from "../products/product";
import { ProductService } from "../products/product.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  errorMessage: string = 'Unable to post the product at the moment';
  postError = false;
  postErrorMessage = '';
  max = 5;
  isReadonly = false;
  // releaseDate: Date;
  overStar: number | undefined;
  percent = 0;
  productCodes!: Observable<string[]>;

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  defaultIProduct: IProduct = {
    productId:100,
    productCode:'',
    productName:"Product Name here..",
    releaseDate:'2022-10-10',
    description:'Your notes here...',
    price:10,
    starRating:0,
    imageUrl:'https:imageUrl.com'
  };

  iProduct : IProduct = { ...this.defaultIProduct};

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.releaseDate = new Date();
    this.productCodes = this.productService.getProductCodes();
  }

  model = new AddProduct(1,
      'Hammer',
      '1234',
      '',
      12,
      'Hammer tool',
      4.5,
      'https://imageurl.com');

  onHttpError(errorResponse: any){
    console.log('error:', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  submitted = false;

  onSubmit(newProduct: NgForm) {
    console.log("in Onsubmit:", newProduct);
    if(this.iProduct) {
      console.log('iProduct::', newProduct)
      this.productService.postProduct(newProduct).subscribe(
          result => console.log('success', result),
          error => console.log('error', error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the errors for saving the product';
    }
    this.submitted = true;
  }

  newHero() {
    this.model = new AddProduct(
        0,
        'Your Product name here',
        'Code here',
        'Todays Date',
        0,
        'Hammer tool',
        0,
        'https://ImageUrl.com');
  }

}

