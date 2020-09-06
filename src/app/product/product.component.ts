import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor( public router:Router) { }

  ngOnInit() {
   
  }
  Details(){
        this.router.navigateByUrl('product-details');
  }

}
