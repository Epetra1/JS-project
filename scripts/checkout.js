import {cart,saveCart,updateCartQuantity} from '../data/cart.js'
import {products} from '../data/products.js'
import {centsToDollers} from '../scripts/utils/moneyItem.js'





//error.. when i try to improt the function form anther js .. it keept showing error that dom is emply but it was because the dom in that another js function was not in this file .... but its too weard 


// function updateCartQuantity(){
//  let cartQuantity= 0;
//  cart.forEach((value)=>{
//    cartQuantity += value.quantity

//  })

//  return cartQuantity;
// }
function updateCheckout(){
document.querySelector('.js-total-item-in-card').innerHTML = updateCartQuantity();


}

cartItemRender()
function cartItemRender(){
    let checkoutHTML = ''
    cart.forEach((item)=>{
       
        let matchingProduct;
        products.forEach((product)=>{
            if(product.id === item.productId){
                matchingProduct = product;
            }
        })
        let HTML = `<div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${centsToDollers(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = '${item.productId}'>
                        Update
                      </span><input type='text' class='js-quantity-update quantity-input'><span class= 'js-quantity-update save-quantity-link link-primary quantity-input '>Save</span>
                      <span class="delete-quantity-link link-primary js-delete-product" data-product-delete = '${item.productId}'>
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `
    checkoutHTML += HTML;
    
    
    })

    document.querySelector('.js-order-summary').innerHTML = checkoutHTML


    
    document.querySelectorAll(`.js-delete-product`).forEach((value)=>{
        value.addEventListener('click',()=>{
            
           const {productDelete} = value.dataset
        
           cart.forEach((toDelete,index)=>{
            if(toDelete.productId === productDelete){
                
                cart.splice(index,1)
                updateCheckout()
                saveCart()
                cartItemRender()
            }
           })
        })


    })
    document.querySelectorAll('.js-update-quantity-link').forEach((value)=>{
        value.addEventListener('click', ()=>{
            const {productId} = value.dataset
            document.querySelectorAll('.js-quantity-update').classList.add('quantity-input-inable')
        })

    })

    

}






