import React, {useState, useEffect, Fragment} from 'react';
  import {Link, useNavigate} from "react-router-dom";
  import CheckoutSteps from './CheckoutSteps';
  import { useSelector } from 'react-redux';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
 
 
  const ConfirmOrder = () => {
      const {cartItems, deliveryInfo} = useSelector((state) => state.cart);
      const {user} = useSelector((state) => state.auth);
      const navigate = useNavigate();
 
      // calculate order prices
      const itemsPrice = cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0);
 
      const deliveryPrice = itemsPrice > 200 ? 0 : 25;
      const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
      const finalTotal = (itemsPrice + deliveryPrice + taxPrice).toFixed(2);
 
      const processToPayment = ()=>{
          const data ={
              itemsPrice: itemsPrice.toFixed(2),
              deliveryPrice,
              taxPrice,
              finalTotal,
          };
          sessionStorage.setItem("orderInfo", JSON.stringify(data));
          navigate("/payment")
      };
    return (
      <>
      <CheckoutSteps delivery confirmOrder />
      <div className='row d-flex justify-content-between'>
          <div className='col-12 col-lg-8 mt-5 order-confirm cartt'>
              <h4 className='mb-3'> Delivery Info</h4>
              <p>
                  <b>Name:</b> {user && user.name}
              </p>
              <p>
                  <b>Phone:</b> {deliveryInfo.phoneNo}
              </p>
              <p className='mb-4'>
                  <b>Address:</b>
                  {  `${deliveryInfo.address},${deliveryInfo.city},${deliveryInfo.postalCode},${deliveryInfo.country}`}
              </p>
              <hr/>
              <h4 className='mt-4'>Your Cart Items:</h4>
              {
                  cartItems.map((item) =>(
                      <Fragment key = {item.id}>
                          <hr />
                          <div className='cart-item my-1' key={item.fooditem}>
                              <div className='row'>
                                  <div className='col-4 col-lg-2'>
                                      <img src={item.image} alt="Item" height="45" width="65"></img>
                                  </div>
                                  <div className='col-4 col-lg-6'>{item.name}</div>
                                  <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                                      <p>
                                          {item.quantity} X
                                          <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                                          {item.price}=
                                          <b> <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                                          {(item.quantity * item.price).toFixed(2)}
                                          </b>
                                      </p>
                                  </div>
                              </div>
 
                          </div>
                      </Fragment>
                  ))
              }
          </div>
          <div className='col-12 col-lg-3 my-5 cartt'>
              <div id='order_summary'>
                  <h4>Order Summary</h4>
                  <hr/>
                  <p>
                      Subtotal:
                      <span className='order-summary-values'>
                      <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                      {itemsPrice}
                      </span>
                  </p>
                  <p>
                  Delivery Charges:
                      <span className='order-summary-values'>
                      <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                      {deliveryPrice}
                      </span>
                  </p>
                  <p>
                  Tax:
                      <span className='order-summary-values'>
                      <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                      {taxPrice}
                      </span>
                  </p>
                  <hr/>

                  <p>
                  Total:
                      <span className='order-summary-values'>
                      <FontAwesomeIcon icon={faIndianRupee} size='xs' />
                      {finalTotal}
                      </span>
                  </p>

                  <hr/>



                  <button id='checkout_btn' className='btn btn-primary btn-block' onClick={processToPayment}>Procced to Payment</button>
                  <br/>
              </div>
          </div>
 
      </div>
      </>
    )
            }
  export default ConfirmOrder;