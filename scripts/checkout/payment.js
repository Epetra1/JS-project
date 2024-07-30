import {cart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {deliveryOptions} from '../../data/deliveryOptions.js'



let checkoutPrice = localStorage.getItem('checkoutPrice');
if (!checkoutPrice || typeof checkoutPrice !== 'object') {
    checkoutPrice = {};
} else {
    try {
        checkoutPrice = JSON.parse(checkoutPrice);
    } catch (e) {
        checkoutPrice = {};
    }
}
localStorage.setItem('checkoutPrice', JSON.stringify(checkoutPrice))


export function paymentSummery(){
    let totalCents =0,totalDeliveryCents = 0;
    cart.forEach((value)=>{
        let matchingProduct = getProduct(value)
        console.log(matchingProduct)
       totalCents+= (Number(value.quantity)*Number(matchingProduct.priceCents))
       deliveryOptions.forEach((deliveryOption)=>{
        if(value.deliveryId===deliveryOption.id){
            totalDeliveryCents += Number(deliveryOption.priceCents)
        }
      })
    })
    checkoutPrice.total = totalCents/100;
    checkoutPrice.totalDelivery = totalDeliveryCents/100;
    checkoutPrice.totalBeforeTax = (totalCents+totalDeliveryCents)/100;
    localStorage.setItem('checkoutPrice', JSON.stringify(checkoutPrice))



    
}
export function paymentView(){
    let HTML = `
  
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items ():</div>
            <div class="payment-summary-money">$${checkoutPrice.total}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${checkoutPrice.totalDelivery}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${checkoutPrice.totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(checkoutPrice.totalBeforeTax/10).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${((checkoutPrice.totalBeforeTax +checkoutPrice.totalBeforeTax*10)/10).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        

    `
    document.querySelector('.payment-summary').innerHTML = HTML
}
