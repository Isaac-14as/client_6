import React, { useEffect, useState } from 'react';
import classes from '../auth/styles/RegisterUserForm.module.css'
import { usersAPI } from '../../services/usersService';
import { useAppSelector } from '../../hooks/redux';



const Change = () => {
    
    const {token} = useAppSelector(state => state.userAuthReducer)
    const [patchUser, infoPatchUser] = usersAPI.usePatchMeUserMutation()
    const {data: userP, error, isLoading} = usersAPI.useGetMeUserQuery(token)


    const [user, setUser] = useState({email: userP.email , gender: userP.gender, first_name: userP.first_name, last_name: userP.last_name, patronymic: userP.patronymic, date_of_birth: userP.date_of_birth})
    const [flag, setFlag] = useState({flag1: userP.gender === 'm', flag2: userP.gender === 'w'})

    // Валидация
    const [userDirty, setUserDirty] = useState({first_name: false, last_name: false, patronymic: false, date_of_birth: false})
    const [userError, setUserError] = useState({gender: '', first_name: '',  last_name: '', patronymic: '', date_of_birth: ''})
    const [formValid, setFormValid] = useState(false)
    const [formDirty, setFormDirty] = useState(false)
    const [formSent, setFormSent] = useState(false)

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'first_name':
                setUserDirty({...userDirty, first_name: true})
                break;
            case 'last_name':
                setUserDirty({...userDirty, last_name: true})
                break;
            case 'patronymic':
                setUserDirty({...userDirty, patronymic: true})
                break;
            case 'date_of_birth':
                setUserDirty({...userDirty, date_of_birth: true})
                break;
            default:
                break;
        }
    }


    const lastNameHandler = (e: any) => {
        setUser({...user, last_name: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, last_name: 'Поле Фамилия не может быть пустым.'})
        } else { 
            setUserError({...userError, last_name: ''})
        }
    }

    const firstNameHandler = (e: any) => {
        setUser({...user, first_name: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, first_name: 'Поле Имя не может быть пустым.'})
        } else { 
            setUserError({...userError, first_name: ''})
        }
    }
    const patronymicHandler = (e: any) => {
        setUser({...user, patronymic: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, patronymic: 'Поле Отчество не может быть пустым.'})
        } else { 
            setUserError({...userError, patronymic: ''})
        }
    }
    const dateOfBirthHandler = (e: any) => {
        setUser({...user, date_of_birth: e.target.value})
        if (e.target.value != "") {
            setUserError({...userError, date_of_birth:""})
        }
    }


    useEffect(() => {
        if (userError.first_name || userError.last_name || userError.patronymic || userError.date_of_birth || (!flag.flag1 && !flag.flag2)) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
        if (userDirty.first_name || userDirty.last_name || userDirty.patronymic || userDirty.date_of_birth) {
            setFormDirty(true)
        } else {
            setFormDirty(false)
        }
    }, [userError, flag, userDirty])

    const handleCreate = async (e: any) => {
        e.preventDefault()
        setFormSent(true)
        await patchUser([{
            "email": userP.email,
            "password": userP.password,
            "gender": user.gender,
            "is_active": true,
            "is_superuser": false,
            "is_verified": false,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "patronymic": user.patronymic,
            "date_of_birth": user.date_of_birth,
            "sub_id": userP.sub_id,
            "trainer_id": userP.trainer_id
          }, token])
    }
    

    return (
        <div className={classes.UserForm}>
            <h1 className={classes.Title}>Регистрация</h1>
            {(!formValid && formDirty) && <div className={classes.Error}>Все поля формы должны быть заполнены и валидны.</div>}
            {!isLoading &&
            <form className={classes.MainForm}  action="">

                {(userDirty.last_name && userError.last_name) && <div className={classes.Error}>{userError.last_name}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Фамилия</label>
                    <input className={classes.UserFormItem}
                    value={user.last_name}
                    name = 'last_name'
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => lastNameHandler(e)}
                    placeholder='Еланский'
                    />
                </div>
                {(userDirty.first_name && userError.first_name) && <div className={classes.Error}>{userError.first_name}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Имя</label>
                    <input className={classes.UserFormItem}
                    value={user.first_name}
                    name="first_name"
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => firstNameHandler(e)}
                    placeholder='Дмитрий'/>
                </div>

                {(userDirty.patronymic && userError.patronymic) && <div className={classes.Error}>{userError.patronymic}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Отчество</label>
                    <input className={classes.UserFormItem}
                    value={user.patronymic}
                    name="patronymic"
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => patronymicHandler(e)}
                    placeholder='Олегович'/>
                </div>

                {(userDirty.date_of_birth && userError.date_of_birth) && <div className={classes.Error}>{userError.date_of_birth}</div>}
                    <label className={classes.LabelBox} htmlFor="">Дата рождения</label>
                    <input type="date" id="start"
                    name="date_of_birth"
                    value={user.date_of_birth}
                    onBlur={e => blurHandler(e)}
                    onChange={e => dateOfBirthHandler(e)}
                    />
                    


                <label className={classes.LabelBox} htmlFor="">Пол</label>
                <div className={classes.checkboxForm}>
                    <div className={classes.checkboxFormItem}>
                        <input type="checkbox" id="m" name="m"
                        onChange={e => [setUser({...user, gender: "m"}), setFlag({...flag, flag1: true, flag2: false})]}
                        checked={flag.flag1} />
                        <label htmlFor="m">Мужской</label>
                    </div>

                    <div className={classes.checkboxFormItem}>
                        <input type="checkbox" id="w" name="w" 
                        onChange={e => [setUser({...user, gender: "w"}), setFlag({...flag, flag1: false, flag2: true})]}
                        checked={flag.flag2} />
                        <label htmlFor="w">Женский</label>
                    </div>
                </div>


                {!infoPatchUser.isError && formSent && <div className={classes.notError}>Пользователь упешно отредактирован.</div>}
                <button className={classes.Btn}
                disabled={!formValid}
                onClick={handleCreate}
                >Изменить</button>
            </form>
            }

        </div>
    );
};

export default Change;