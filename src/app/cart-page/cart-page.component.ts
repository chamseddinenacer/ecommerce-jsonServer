import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  productData: product | undefined ;
  cartt:undefined | cart;
  // qqt:any
  // proid:any
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  productMessage: any;
  qqt2: any;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
   this.loadDetails()

  }

  removeToCart(cartId:number|undefined ,qqt:number|undefined,  proid:number|undefined){

    console.log(qqt)
    console.log(proid)

    this.qqt2=qqt


    this.product.getProduct2(proid).subscribe((result)=>{
      this.productData= result;

      console.log(this.productData)
      console.log("produit sayiiii")


   
      this.productData.stock=  this.productData.stock + this.qqt2
      this.product.updateProduct( this.productData).subscribe((result) => {
        console.log("d5alll fel boucle")
        if (result) {
          this.productMessage = 'Product has updated';

          console.log("sayiiiiii")
        }
      }); 


    }); 

    



    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();

    

    })

   


   
     
}

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);

      console.log(this.cartData);
      let price = 0;
      
      result.forEach((item) => {
        if (item.quantity && item.price && !isNaN(item.quantity) && !isNaN(item.price)) {
          price += (+item.price * +item.quantity);
        }
      });


      console.log(price)
      console.log("zzzzzzzzzzzzzzzzzz")
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }




  checkout() {
    this.router.navigate(['/checkout'])
  }

}
