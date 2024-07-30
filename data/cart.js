import {paymentSummery,paymentView} from '../scripts/checkout/payment.js'
export const cart =JSON.parse(localStorage.getItem('cart'))

export function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
    paymentSummery()
    paymentView()


}

export function addToCart(productId){
    let exists;  
    
    cart.forEach((value)=>{
      if(value.productId ===productId){
        exists = value
      }
    })
    if(exists){
      exists.quantity += Number(document.querySelector(`.js-product-quantity-${productId}`).value)
    }else{
      cart.push({
        productId:productId,
        quantity:Number(document.querySelector(`.js-product-quantity-${productId}`).value),
        deliveryId:'1'
      })
    }

    saveCart()
  
  }
  //calculate total quantity in card 
  export  function updateCartQuantity(){
    let cartQuantity='';
    cart.forEach((value)=>{
      cartQuantity =Number(cartQuantity)+ value.quantity
  
    })
    return cartQuantity;
  }
  
  function updateDeliveryData(cardItem){
    


  }