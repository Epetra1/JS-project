import {cart, addToCart, updateCartQuantity} from '../data/cart.js'
import {products} from '../data/products.js'
import {centsToDollers} from '../scripts/utils/moneyItem.js'

let productsHTML = ''
products.forEach((product)=>{
    productsHTML += `       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${centsToDollers(product.priceCents)}$
          </div>
          <div class="product-quantity-container">
            <select class='js-product-quantity-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-card-button" data-product-id = '${product.id}'>
            Add to Cart
          </button>
        </div>`

})

//calculating cart quantity

//  function undateCartQuantity(){
//   let cartQuantity='';
//   cart.forEach((value)=>{
//     cartQuantity =Number(cartQuantity)+ value.quantity

//   })
//   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
//   return cartQuantity;
// }
document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
document.querySelector('.js-products-grid').innerHTML = productsHTML
     
document.querySelectorAll('.js-add-to-card-button').forEach((button)=>{
  button.addEventListener('click',()=>{
    const {productId} = button.dataset
    addToCart(productId);
    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

    //for added to cart 
    const element = document.querySelector(`.js-added-to-cart-${productId}`)
    let instanceID=null;
    handleReClick()
    function handleReClick(){
      if(instanceID){
        clearTimeout(instanceID);
      }
        instanceID = setTimeout(()=>{
          element.classList.remove('added-visible')
          instanceID=null
        },2000)
        element.classList.add('added-visible')     
      }
 })
})

