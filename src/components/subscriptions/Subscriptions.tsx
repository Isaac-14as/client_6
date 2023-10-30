import classes from '../subscriptions/styles/Subscriptions.module.css';
import { FcFlashOn } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';


const Subscriptions = (props: any) => {
    const {isAuth, nPage, token} = useAppSelector(state => state.userAuthReducer)

    console.log(props.subs)
    console.log('asdasdsd')
    return (
        <div className={classes.SubBox}>
            <div className={classes.titleMain}>Абонименты</div>
            <div className={classes.SubMain}>
                {props.subs && props.subs.map((sub: any) =>
                    <div className={classes.Sub}>
                        <div className={classes.title}>Тариф</div>
                        <div className={classes.subField}>«{sub.name}»</div>
                        <div className={classes.subField}><p className={classes.text}><b className={classes.text1}>Ежемесячный платеж: </b><b className={classes.text2}>{sub.price}₽</b></p></div>
                        <div className={classes.opps}>
                            {sub.subscription_type_infos.map((opp: any) =>
                                <div className={classes.oppField}><FcFlashOn/>{opp.name}</div>
                            )}
                        </div>
                        {isAuth ? <Link className={classes.Btn} to={'/sub/' + `${sub.id}`} >Купить</Link>:
                        <Link className={classes.Btn} to='/entry' >Войти в аккаунт</Link>}
                      
                    </div> 
                )}

            </div> 
        </div>


    );
};

export default Subscriptions;