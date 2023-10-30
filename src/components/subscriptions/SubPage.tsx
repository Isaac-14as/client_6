import React, { useEffect, useState } from 'react';
import classes from '../subscriptions/styles/SubPage.module.css';
import { FcFlashOn } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import { subAPI } from '../../services/subService';
import { usersAPI } from '../../services/usersService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';


const SubPage = (props: any) => {
    const params = useParams()
    const subIdMain = params.id
    const {data: sub, error, isLoading} = subAPI.useGetSubByIdQuery(subIdMain)

    const [cardDirty, setCardDirty] = useState({number: false, cvv: false, period: false})
    const [cardError, setCardError] = useState({number: 'Поле Номер не может быть пустым.', cvv: 'Поле CVV не может быть пустым.', period: 'Поле Срок действия карты не может быть пустым.' })
    const [formValid, setFormValid] = useState(false)
    const [formDirty, setFormDirty] = useState(false)
    const [formQ, setFromQ] = useState(false)

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'number':
                setCardDirty({...cardDirty, number: true})
                break;
            case 'cvv':
                setCardDirty({...cardDirty, cvv: true})
                break;
            case 'period':
                setCardDirty({...cardDirty, period: true})
                break;
            default:
                break;
        }
    }

    const numberHandler = (e: any) => {
        if (e.target.value.length !== 16) {
            setCardError({...cardError, number: 'Некорректный Номер карты.'})
        }
        if (e.target.value.length === 0) {
            setCardError({...cardError, number: 'Поле Номер не может быть пустым.'})
        } 
        if (e.target.value.length === 16) {
            setCardError({...cardError, number: ''})
        }
    }

    const cvvHandler = (e: any) => {
        if (e.target.value.length !== 3) {
            setCardError({...cardError, cvv: 'Некорректный CVV.'})
        }
        if (e.target.value.length === 0) {
            setCardError({...cardError, cvv: 'Поле CVV не может быть пустым.'})
        } 
        if (e.target.value.length === 3) {
            setCardError({...cardError, cvv: ''})
        }
    }

    const periodHandler = (e: any) => {
        if (e.target.value.length !== 5) {
            setCardError({...cardError, period: 'Некорректный Срок действия карты.'})
        }
        if (e.target.value.length === 0) {
            setCardError({...cardError, period: 'Поле Срок действия карты не может быть пустым.'})
        } 
        if (e.target.value.length === 5) {
            setCardError({...cardError, period: ''})
        }
    }

    useEffect(() => {
        if (cardError.number || cardError.cvv || cardError.period) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
        if (cardDirty.number || cardDirty.cvv || cardError.period) {
            setFormDirty(true)
        } else {
            setFormDirty(false)
        }
    }, [cardError, cardDirty])


    const {token, sub_id} = useAppSelector(state => state.userAuthReducer)
    const [patchUser, infoPatchUser] = usersAPI.usePatchMeUserMutation()
    const {data: userP} = usersAPI.useGetMeUserQuery(token)

    const {setSub} = userAuthSlice.actions;
    const dispatch = useAppDispatch()

    const handlePatch = async (e: any) => {
        e.preventDefault()
        console.log('asasasassaas')
        await patchUser([{
            "email": userP.email,
            // "password": userP.password,
            "gender": userP.gender,
            "is_active": true,
            "is_superuser": false,
            "is_verified": false,
            "first_name": userP.first_name,
            "last_name": userP.last_name,
            "patronymic": userP.patronymic,
            "date_of_birth": userP.date_of_birth,
            "sub_id": Number(subIdMain),
            "trainer_id": userP.trainer_id
          }, token])
        setFromQ(true)
        dispatch(setSub(String(subIdMain)))
    }

    return (
        <div className={classes.SubPage}>
            {!isLoading &&
            <div className={classes.SubMain}>
                <div className={classes.info}>
                    <div className={classes.title1}>Вы выбрали тариф <b className={classes.Name}>«{sub.name}»</b></div>
                    <div className={classes.title1}>Цена: <b className={classes.Name}>{sub.price}</b></div>
                    <div className={classes.title2}>Включино в абонемент:</div>
                    {sub.subscription_type_infos.map((opp: any) =>
                        <div className={classes.oppField}><FcFlashOn/>{opp.name}</div>
                    )}
                </div>
                <div className={classes.pay}>
                        <div className={classes.title3}>Введите данные для оплаты</div>
                    {(cardDirty.number && cardError.number) && <div className={classes.Error}>{cardError.number}</div>}
                    <div className={classes.ItemBox}>
                        <label className={classes.LabelBox} htmlFor="">Номер карты</label>
                        <input className={classes.UserFormItem}
                        name = 'number'
                        type="text"
                        onChange={e => numberHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder='XXXX XXXX XXXX XXXX'/>
                    </div> 
                    {(cardDirty.cvv && cardError.cvv) && <div className={classes.Error}>{cardError.cvv}</div>}
                    <div className={classes.ItemBox}>
                        <label className={classes.LabelBox} htmlFor="">CVV</label>
                        <input className={classes.UserFormItem}
                        name="cvv"
                        type="password"
                        onChange={e => cvvHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder='***'
                        />
                    </div>
                    {(cardDirty.period && cardError.period) && <div className={classes.Error}>{cardError.period}</div>}
                    <div className={classes.ItemBox}>
                        <label className={classes.LabelBox} htmlFor="">Срок действия карты</label>
                        <input className={classes.UserFormItem}
                        name="period"
                        type="text"
                        onChange={e => periodHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder='ММ/ГГ'
                        />
                    </div>


                    {formQ && <div className={classes.notError}>Оплата прошла успешно</div>}
                    <button className={classes.Btn}
                    disabled={!formValid}
                    onClick={handlePatch}
                    >Оплатить</button>



                </div>
            </div>
            }
        </div>


    );
};

export default SubPage;