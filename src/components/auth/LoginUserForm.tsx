import { useEffect, useState } from 'react';
import { authAPI } from '../../services/authService';
import classes from '../auth/styles/RegisterUserForm.module.css'
import { useAppDispatch } from '../../hooks/redux';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';

const LoginUserForm = () => {
    const {auth, setNPage, setToken} = userAuthSlice.actions;
    const dispatch = useAppDispatch()
    const [loginUser, infoUserLogin] = authAPI.useLoginUserMutation()
    const [user, setUser] = useState({username: '', password: ''})

    // Валидация
    const [userDirty, setUserDirty] = useState({username: false, password: false})
    const [userError, setUserError] = useState({username: 'Поле Почта не может быть пустым.', password: 'Поле Пароль не может быть пустым.'})
    const [formValid, setFormValid] = useState(false)
    const [formDirty, setFormDirty] = useState(false)


    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'username':
                setUserDirty({...userDirty, username: true})
                break;
            case 'password':
                setUserDirty({...userDirty, password: true})
                break;
            default:
                break;
        }
    }

    const usernameHandler = (e: any) => {
        setUser({...user, username: e.target.value})
        const re = /^\S+@\S+\.\S+$/;
        if (!re.test(String(e.target.value).toLocaleLowerCase())) {
            setUserError({...userError, username: 'Некорректный e-mail.'})
        } else {
            setUserError({...userError, username: ''})
        }
    }

    const passwordHandler = (e: any) => {
        setUser({...user, password: e.target.value})
        if (e.target.value.length < 8) {
            setUserError({...userError, password: 'Длина пароля должна быть не менее 8 символов.'})
        } else { 
            setUserError({...userError, password: ''})
        }
    }

    useEffect(() => {
        if (userError.username || userError.password) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
        if (userDirty.username || userDirty.password) {
            setFormDirty(true)
        } else {
            setFormDirty(false)
        }
    }, [userError, userDirty])

    const handleLogin= async (e: any) => {
        e.preventDefault()
        const qs = require('qs');

        const res = await loginUser(qs.stringify({
            "username": user.username,
            "password": user.password,
          }))

        console.log(infoUserLogin)
        if (!infoUserLogin.isError) {
            try {
                const token = JSON.parse(JSON.stringify(res)).data.access_token
                dispatch(setToken(token))
                dispatch(setNPage('profile'))
                dispatch(auth(true))
            } catch {
                console.log(JSON.parse(JSON.stringify(res)).error.status);
            }
        }
    }

    

    return (
        <div className={classes.UserForm}>
            <h1 className={classes.Title}>Вход</h1>
            {(!formValid && formDirty) && <div className={classes.Error}>Все поля формы должны быть заполнены и валидны.</div>}
   
            <form className={classes.MainForm}  action="">

                {(userDirty.username && userError.username) && <div className={classes.Error}>{userError.username}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Почта</label>
                    <input className={classes.UserFormItem}
                    value={user.username}
                    name = 'username'
                    type="e-mail"
                    onBlur={e => blurHandler(e)}
                    onChange={e => usernameHandler(e)}
                    placeholder='elan.dmitriy@gmail.com'/>
                </div> 

                {(userDirty.password && userError.password) && <div className={classes.Error}>{userError.password}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Пароль</label>
                    <input className={classes.UserFormItem}
                    value={user.password}
                    name="password"
                    type="password"
                    onBlur={e => blurHandler(e)}
                    onChange={e => passwordHandler(e)}
                    placeholder='**********'
                    />
                </div>
                {infoUserLogin.isError && <div className={classes.Error}>Неверный e-mail или пароль</div>}
                <button className={classes.Btn}
                disabled={!formValid}
                onClick={handleLogin}
                >Войти</button>

            </form>

        </div>
    );
};

export default LoginUserForm;

