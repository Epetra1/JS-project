import {cart,saveCart,updateCartQuantity} from '../data/cart.js'
import {deliveryOptions} from '../data/deliveryOptions.js'
import {products} from '../data/products.js'
import {centsToDollers} from '../scripts/utils/moneyItem.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'





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

        let deliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === item.deiveryId){
                deliveryOption =option
            }
        })
        
        let deliveryDay = dayjs().add(Number(deliveryOption.days),'day').format('dddd, MMMM D')
         

        let HTML = `<div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: ${deliveryDay}
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
                        Quantity: <span class="quantity-label-update-${item.productId} quantity-label">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = '${item.productId}'>
                        Update
                      </span><input type='text' class='js-quantity-update-${item.productId} js-quantity-input-${item.productId} quantity-input'><span class= 'js-quantity-update-${item.productId} js-save-quantity-link-${item.productId} link-primary quantity-input '>Save</span>
                      <span class="delete-quantity-link link-primary js-delete-product" data-product-delete = '${item.productId}'>
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,item)}
                    
                    </div>
                  </div>
                </div>
              </div>
    `
    checkoutHTML += HTML;
    
    
    })

    function deliveryOptionsHTML(matchingProduct,item){
        let HTML =''
        deliveryOptions.forEach((deliveryOption)=>{
            let abc = dayjs();
            let deliveryDay =abc.add(Number(deliveryOption.days),'day').format('dddd, MMMM D')
            let pricestring = deliveryOption.priceCents === 0?'Free':`$${centsToDollers(deliveryOption.priceCents)}`
            let isChecked = deliveryOption.id === item.deiveryId
            console.log(isChecked)

        HTML +=`
                    <div class="delivery-option">
                      <input type="radio" ${isChecked?'checked':''}
                        class="delivery-option-input" data-delivery-id ='${g}'
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryDay}
                        </div>
                        <div class="delivery-option-price">
                          ${pricestring} Shipping
                        </div>
                      </div>
                    </div>`
            

        })

        return HTML;
    }
    

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
    //logic for quantity update
    let quantityTruth
    document.querySelectorAll('.js-update-quantity-link').forEach((value)=>{
        value.addEventListener('click', ()=>{
            const {productId} = value.dataset
            document.querySelectorAll(`.js-quantity-update-${productId}`).forEach(
                (classe)=>{
                    classe.classList.add('quantity-input-inable')
                    document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click', (event)=>{
                        
                        cart.forEach((button)=>{
                            if(button.productId==productId){
                                

                                let quantity = document.querySelector(`.js-quantity-input-${productId}`).value;
                                quantityTruth = Number(quantity)>10||!Number.isInteger(Number(quantity))
                                if(!quantityTruth){
                                    button.quantity=Number(quantity);
                                    document.querySelector(`.quantity-label-update-${productId}`).innerHTML=quantity;
                                }
                                else{
                                    alert('error')
                                    return;
                                }
                            }
                    
                        })
                        
                        classe.classList.remove('quantity-input-inable')
                        saveCart()
                    }
                    )
                }
            )
            
        })

    })
}
//logic end 


