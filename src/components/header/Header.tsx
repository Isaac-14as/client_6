import React from "react";
import classes from "./Header.module.css";
import { FiPhone, FiLogIn } from 'react-icons/fi';
import { useAppSelector } from "../../hooks/redux";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Entry from "../auth/Entry";
import { subAPI } from "../../services/subService";

import logo from '../header/logo.png'


const Header = () => {
    const {isAuth} = useAppSelector((state: { userAuthReducer: any; }) => state.userAuthReducer)

    return (

            <header>
                {/* <div className={classes.logo}>LOGO</div> */}
                <Link to='/'> <img className={classes.logo} src={logo} alt="LOGO" /></Link>
                <div className={classes.header_navbar}>
                    {/* <a className={classes.header_navbar_item} href="">клубы</a> */}
                    <Link  to='/trainers'>Тренеры</Link>
                </div>
                <Link className={classes.buy_subscription} to='/sub'>купить абонимент</Link>
                <div className={classes.right_navbar}>
                    <div className={classes.phone}><FiPhone /> <p className={classes.phone_item}>+7 927 128 39 50</p></div>

                    {isAuth ? <Link className={classes.entry} to='/entry/*'><p className={classes.entry_item}>ПРОФИЛЬ</p></Link> : 
                    <Link className={classes.entry} to='/entry/*'><FiLogIn /><p className={classes.entry_item}>ВОЙТИ</p></Link>}
                    {/* <Link className={classes.entry} to='/'><FiLogIn /><p className={classes.entry_item}>qqqq</p></Link> */}
                </div>
            </header>


    )
}

export default Header;






