export const cart =[{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
},
{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 3
}]

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
        quantity:Number(document.querySelector(`.js-product-quantity-${productId}`).value)
      })
    }
  
  }