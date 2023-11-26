import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
 

@Component({
  selector: 'app-detail-pro',
  templateUrl: './detail-pro.component.html',
  styleUrls: ['./detail-pro.component.css']
})
export class DetailProComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  productMessage: any;
  pasProduit:boolean=false
  pasProduitNEG:boolean=false
  addtocartt:boolean=false

  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;

      if( this.productData.stock==0){
        console.log( "le stock est 00000")
        

        this.pasProduit=true
      }

      if( this.productData.stock<0){
        console.log( "le quantite qui vous choisez est indisponible")

        this.pasProduit=true
      }



      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
      
      
      
    })
    
  }
  handleQuantity(val:string){
if(this.productData){


  if(this.productQuantity<20 && this.productQuantity<this.productData.stock && val==='plus'){
    this.productQuantity+=1;
  }else if(this.productQuantity>1 && val==='min'){
    this.productQuantity-=1;
  }

}
 
  }

  addToCart( ){
    if(this.productData){


      this.productData.stock= this.productData.stock-this.productQuantity
      console.log( this.productData.stock)
      console.log( "sssssssssssssssssss")
      

      if( this.productData.stock==0){
        console.log( "le stock est 00000")

        this.pasProduit=true
      }

      if( this.productData.stock<0){
        console.log( "le quantite qui vous choisez est indisponible")

        this.pasProduitNEG=true
      }
      if(this.productData.stock>0 || this.productData.stock==0){

        if(this.productData.stock==0){
          this.pasProduit=true
        }
      
        this.product.updateProduct( this.productData).subscribe((result) => {
          if (result) {
            this.productMessage = 'Product has updated';

            console.log(result)

            // if(result.stock=0){

            //   console.log(result.stock)
            //   console.log("le produit pas existe")
              
            // }

 
          }
        }); 


    







      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:cart={
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{

          this.addtocartt=true
          
          if(result){
           this.product.getCartList(userId);
           this.removeCart=true
          }
        })   
      

    
        
        

      }  
    }
      
    } 
  }


 






  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
       this.product.removeItemFromCart(productId)
    }else{
      console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
      if(this.productData &&  this.cartData){
    
      this.productData.stock=  this.productData.stock +  this.cartData.quantity
      this.product.updateProduct( this.productData).subscribe((result) => {
        if (result) {
          this.productMessage = 'Product has updated';
        }
      }); 

    }

    }
    this.removeCart=false
  }


}
