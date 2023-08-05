/* eslint-disable no-unused-vars */
import React, {useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../Context/ContextProvider'
import { NavLink } from 'react-router-dom';
import "./rightheader.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';

const Rightheader = ({Logclose,logoutuser}) => {

    const {account,setAccount} = useContext(LoginContext)
    console.log(account)

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
            {
                account ? <Avatar className='avtar2'>{account.yname[0].toUpperCase()}</Avatar>  
                        : <Avatar className='avtar'></Avatar>
            }

            {account ? <h3>Hello, {account.yname.toUpperCase()} </h3> : ""}

        </div>
        <div className="nav_btn" onClick={() =>Logclose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Shop By  category</NavLink>

            <Divider/>

            <NavLink to="/">today's Deal</NavLink>
            {
                account ? <NavLink to="/buynow">Your Orders</NavLink> : <NavLink to="/login">Your Orders</NavLink>
            }

            
            <Divider/>
            <div className="flag">
                <NavLink to="/">Settings</NavLink>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_India.png" style={{width:30, marginLeft:10,marginBottom:10}} alt="" />
            </div>

            {
                account ?
                <div className="flag">
                    <LogoutIcon style={{fontSize:18,marginRight:4}}/>
                    <h3 onClick={()=>logoutuser()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
                </div> :
                <NavLink to="/login">Sign in</NavLink>
            }
        </div>
      </div>
    </>
  )
}

export default Rightheader
