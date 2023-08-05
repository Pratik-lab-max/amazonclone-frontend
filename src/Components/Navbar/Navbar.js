/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {React, useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Rightheader from './Rightheader';
import { NavLink, useActionData, useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {ToastContainer, toast} from 'react-toastify'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const {account,setAccount} = useContext(LoginContext)
    // console.log(account)

    const history = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text,setText] = useState("")
    console.log(text)
    

    const {products} = useSelector(state => state.getproductsdata)

    const [dropen,setDropen] = useState(false)

    const getdetailvaliduser = async()=>{
        const res = await fetch("/validuser" , {
            method:"GET",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        })

        const data = await res.json()
        // console.log(data)

        // if(res.status !== 201){
        //     console.log("error")
        // }else{
        //     console.log("data valid")
        //     setAccount(data)
        // }
    }

    const handleopen = () => {
        setDropen(true)
    }

    const handledrclose = () => {
        setDropen(false)
    }

    const logoutuser = async()=>{
        const res2 = await fetch("/logout" ,{
            method:"GET",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        })

        const data2 = await res2.json()
        console.log(data2)

        if(res2.status !==201) {
            console.log("error")
        }else {
            toast.success("user logout" ,{
                position:"top-center"
            })
            history("/")
            setAccount(false)
        }
    }

    const getText = (items) =>{
        setText(items)
    }

    useEffect(() => {
        getdetailvaliduser()
    })

  return (
    <header>
        <nav>
            <div className="left">
                <IconButton className="hamburgur" onClick={handleopen}>
                    <MenuIcon style={{color:"white"}}/>
                </IconButton>
                <SwipeableDrawer open={dropen} onClose={handledrclose}>
                    <Rightheader Logclose={handledrclose} Logoutuser={logoutuser}/>
                </SwipeableDrawer>

                <div className="navlogo">
                    <NavLink to="/"><img src="https://pnggrid.com/wp-content/uploads/2021/05/Amazon-Logo-1024x426.png" alt="" /></NavLink>
                </div>
                <div className="nav_searchbar">
                    <input type="text" name="" onChange={(e)=>getText(e.target.value)} placeholder="Search your products" id="" />
                    <div className="search_icon">
                        <SearchIcon id="search"/>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="nav_btn">
                    <NavLink to="/login"><LoginIcon style={{ fontSize: 16, marginRight: 3 }}/>Sign in</NavLink>
                </div>

                {
                    account ?<NavLink to="/buynow">
                        <div className="cart_btn">
                            <Badge badgeContent={account.carts.length} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                        <p>Cart</p>
                        </div>
                    </NavLink> : <NavLink to="/login">
                        <div className="cart_btn">
                            <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>

                        <ToastContainer />
                        <p>Cart</p>
                        </div>
                    </NavLink>
                                    
                }

                {
                    account ? <Avatar className='avtar2'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    >{account.yname[0].toUpperCase()}</Avatar>  
                            : <Avatar className='avtar'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            ></Avatar>
                }
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    {
                        account ? <MenuItem onClick={handleClose} style={{ margin: 10 }} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem> : ""
                    }
                </Menu>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
