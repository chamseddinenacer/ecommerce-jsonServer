export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}

export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:any,
  quantity:undefined | number,
  productId:undefined|number
  stock:any
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  // quantity:undefined | number,
  quantity:any,
  productId:number,
  userId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
}