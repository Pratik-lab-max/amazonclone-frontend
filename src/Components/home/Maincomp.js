import React, { useEffect } from 'react'
import Banner from './Banner'
import "./Maincomp.css"
import Slider from './Slider'
import { getProducts } from '../Redux/Actions/Action'
import {useDispatch,useSelector} from "react-redux"

const Maincomp = () => {

  const {products} = useSelector(state => state.getproductsdata) 
  // console.log(products)

  const dispatch = useDispatch()

  useEffect(()=>{
    console.log("Dispatching getProducts()");
    dispatch(getProducts())
  },[dispatch])

  return (
    <div className='home_section'>
      <div className="banner_part">
        <Banner />
      </div>
      
      <div className="slide_part">

        <div className="left_slide">
          <Slider title="Deal of The Day" products={products} />
        </div>

        <div className="right_slide">
          <h4>Festival Latest Lunches</h4>
          <img src="https://imgeng.jagran.com/images/2020/oct/amamzon1602835778262.jpg" alt="" />
          <a href="#">See More</a>
        </div>

      </div>
      <Slider title="Today's Deal" products={products} />
      <div className="center_img">
        <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
      </div>
      <Slider title="Best Sellers" products={products} />
      <Slider title="Upto 80% off" products={products} />
    </div>
  )
}

export default Maincomp
