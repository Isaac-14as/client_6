import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import classes from '../auth/styles/Entry.module.css'
import LoginUserForm from './LoginUserForm';
import RegisterUserForm from './RegisterUserForm';

import f_2 from '../../img/f_2.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import { authAPI } from '../../services/authService';
import Profile from './Profile';
import Change from './Change';



const Entry = (props: any) => {
    const [logoutUser, infoUserLogout] = authAPI.useLogoutUserMutation()

    const {isAuth, nPage, token} = useAppSelector(state => state.userAuthReducer)
    const {auth, setNPage, setToken} = userAuthSlice.actions;
    const dispatch = useAppDispatch()

     
    const handleLogout = async (e: any) => {
        e.preventDefault()
        await logoutUser('')
        dispatch(auth(false))
        dispatch(setToken(''))
    }


    return (
        <div className={classes.EntryBox}>
            
            <img src={f_2} alt="Изображение не найдено" />
            <div className={classes.navMain}>

                <div className={classes.Form}>
                    {nPage === 'login' && <LoginUserForm/>}
                    {nPage === 'register' && <RegisterUserForm/>}
                    {nPage === 'profile' && <Profile/>}
                    {nPage === 'change' && <Change/>}
                </div>
                {isAuth &&
                <div className={classes.navBar}>
                    {nPage === 'profile' ? <div className={classes.navItem + ' ' + classes.navItemActiv} onClick={e => dispatch(setNPage('profile'))}>Профиль</div> :
                    <div className={classes.navItem} onClick={e => dispatch(setNPage('profile'))}>Профиль</div>}
                    {nPage === 'change' ? <div className={classes.navItem + ' ' + classes.navItemActiv} onClick={e => dispatch(setNPage('change'))}>Редактировать</div>:
                    <div className={classes.navItem} onClick={e => dispatch(setNPage('change'))}>Редактировать</div>}
                    <div className={classes.navItem} onClick={e => [dispatch(setNPage('login')), handleLogout(e)]}>Выйти</div>
                </div>
                }
                {!isAuth &&
                <div className={classes.navBar}>
                    {nPage === 'login' ?  <div className={classes.navItem + ' ' + classes.navItemActiv } onClick={e => dispatch(setNPage('login'))}>Вход</div> :
                    <div className={classes.navItem} onClick={e => dispatch(setNPage('login'))}>Вход</div>}

                    {nPage === 'register' ?  <div className={classes.navItem + ' ' + classes.navItemActiv} onClick={e => dispatch(setNPage('register'))}>Регистрация</div> :
                    <div className={classes.navItem} onClick={e => dispatch(setNPage('register'))}>Регистрация</div>}
                </div>
                }
            </div> 
        </div>

    );
};

export default Entry;