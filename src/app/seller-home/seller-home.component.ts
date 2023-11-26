import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  sellerName: any;
  menuType: any;
  userName: any;
  constructor(private product: ProductService,private route: Router,) {}

  ngOnInit(): void {
    this.list();

    // this.route.events.subscribe((val: any) => {
    //   if (val.url) {
    //     if (localStorage.getItem('seller') && val.url.includes('seller')) {
    //      let sellerStore=localStorage.getItem('seller');
    //      console.log(sellerStore)
    //      let sellerData =sellerStore && JSON.parse(sellerStore)[0];
    //      this.sellerName=sellerData.name;
    //       this.menuType = 'seller';
    //     }
       
    //      else {
    //       this.menuType = 'default';
        
    //     }
    //   }
     
    // });
    
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
