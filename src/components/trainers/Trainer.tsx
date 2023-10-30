import classes from '../trainers/styles/Trainer.module.css';
import { FcFlashOn } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { trainerAPI } from '../../services/trainerService';

import trainer_1 from '../trainers/img/trainer_1.jpg'
import trainer_2 from '../trainers/img/trainer_2.jpg'
import trainer_3 from '../trainers/img/trainer_3.jpg'
import trainer_4 from '../trainers/img/trainer_4.jpg'
import trainer_5 from '../trainers/img/trainer_5.jpg'
import { useAppSelector } from '../../hooks/redux';
import { usersAPI } from '../../services/usersService';


const Trainer = (props: any) => {
    const {isAuth, nPage, token} = useAppSelector(state => state.userAuthReducer)
    const {data: trainers, error, isLoading} = trainerAPI.useGetAllTrainerQuery({})
    const imgs = [trainer_1, trainer_2, trainer_3, trainer_4, trainer_5]

    const [patchUser, infoPatchUser] = usersAPI.usePatchMeUserMutation()
    const {data: userP} = usersAPI.useGetMeUserQuery(token)

    const handlePatch = async (trenId: number, e: any) => {
        e.preventDefault()
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
            "sub_id": userP.sub_id,
            "trainer_id": Number(trenId)
          }, token])
    }

    return (
        <div className={classes.SubBox}>
            <div className={classes.titleMain}>Наши тренеры</div>
            <div className={classes.SubMain}>
                {trainers && trainers.map((trainer: any) =>
                    <div className={classes.Sub}>
                        <img className={classes.imgN} src={imgs[Number(trainer.img_path[8]) - 1]} alt="Нет" />
                        <div className={classes.subField}>{trainer.name}</div>
                        <div className={classes.subField}><p className={classes.text}><b className={classes.text1}>Возраст </b>{trainer.age}</p></div>
                        <div className={classes.subField}><p className={classes.text}><b className={classes.text1}>Цена индивидуального занятия: </b><b className={classes.text2}>{trainer.price}₽</b></p></div>
                        <div className={classes.opps}>
                            {trainer.trainer_infos.map((opp: any) =>
                                <div className={classes.oppField}><FcFlashOn/>{opp.name}</div>
                            )}
                        </div>
                        {isAuth ? <button className={classes.Btn}
                        onClick={e => handlePatch(trainer.id, e)}
                        >Выбрать</button>:
                        <Link className={classes.Btn} to='/entry' >Войти в аккаунт</Link>}
                    </div> 
                )}

            </div> 
        </div>


    );
};

export default Trainer;