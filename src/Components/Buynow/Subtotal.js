/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const Subtotal = ({item}) => {

  const [price,setPrice] = useState(0)

  useEffect(()=>{
    totalAmount()
  },[item])

  const totalAmount = () => {
    let price = 0
    item.map((item) => {
      price = item.price.cost + price
    })
    setPrice(price)
  }

  return (
    <div className='sub_item'>
      <h3>Subtotal ({item.length} items): <strong style={{color:"#111",fontWeight:700}}>₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal
