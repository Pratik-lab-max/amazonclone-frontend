import React from 'react'
import "./NewNav.css"

const NewNav = () => {
  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
          <p>All</p>
          <p>Mobiles</p>
          <p>Best Sellers</p>
          <p>Fashion</p>
          <p>Customer Service</p> 
          <p>Electronics</p>
          <p>Prime</p>
          <p>TOday's Deals</p>
          <p>Amazon Pay</p>
        </div>
        <div className="right_data">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/UAP106/400x39-SWM._CB608640262_.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default NewNav
