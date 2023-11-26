import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
 

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}
 
   ngOnInit(): void {
     this.product.popularProducts().subscribe((data)=>{
       this.popularProducts=data;
     })
 
     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
     })
   }
 }
 