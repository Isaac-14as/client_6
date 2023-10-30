
import classes from '../auth/styles/Profile.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { usersAPI } from '../../services/usersService';
import { subAPI } from '../../services/subService';
import { ISub } from '../../models/ISub';
import { trainerAPI } from '../../services/trainerService';
import { ITrainer } from '../../models/ITrainer';


const Profile = () => {
    let {token} = useAppSelector(state => state.userAuthReducer)
    const {data: userP, error, isLoading} = usersAPI.useGetMeUserQuery(token, {
        pollingInterval: 1000
    })
    


    const {data: subMain, error: errorSub, isLoading: isLoadingSub} = subAPI.useGetAllSubQuery({}, {
        pollingInterval: 1000
    })

    let subT: ISub = {'id': NaN, "name": '', "price": NaN, "subscription_type_infos": []}
    let subName = "Пока нет"
    if (userP && !isLoadingSub && subMain && userP.sub_id) {

        for (let i = 0; i < 3; i++) {
            if (subMain[i].id === userP.sub_id) {
                subT = subMain[i]
            }
        }
        subName = subT.name
    }

    const {data: trainerMain, error: errorTrainer, isLoading: isLoadingTrainer} = trainerAPI.useGetAllTrainerQuery({},{
        pollingInterval: 1000
    })

    let trainerT: ITrainer = {'id': NaN, "name": '', "price": NaN, "img_path": "", age: NaN, trainer_infos: []}
    let trainerName = "Пока нет"
    if (userP && !errorTrainer && trainerMain && userP.trainer_id) {
        for (let i = 0; i < 5; i++) {
            if (trainerMain[i].id === userP.trainer_id) {
                trainerT = trainerMain[i]
            }
        }
        trainerName = trainerT.name
    }
        

    return (
        <div className={classes.Profile}>
            {!isLoading &&
            <div className="box">
                <div className={classes.title}>Ваш профиль</div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Фамилия: </b>{userP.last_name}</p></div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Имя: </b>{userP.first_name}</p></div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Отчество: </b>{userP.patronymic}</p></div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Почта: </b>{userP.email}</p></div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Дата рождения: </b>{userP.date_of_birth}</p></div>
                {userP.gender === 'm' ?
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Пол: </b>Мужской</p></div>
                : <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Пол: </b>Женский</p></div>}
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Абонемент: </b>{subName}</p></div>
                <div className={classes.ProfileItem}><p><b className={classes.nameFild}>Тренер: </b>{trainerName}</p></div>
            </div>
            }
        </div>
    );
};

export default Profile;

