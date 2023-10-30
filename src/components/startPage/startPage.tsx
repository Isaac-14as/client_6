import classes from '../startPage/startPage.module.css'
import fon from '../startPage/f_1.jpg'

const StartPage = () => {
    
    return (
        <div className={classes.Main}>
            <img className={classes.fon} src={fon} alt=""></img>
            <div className={classes.fon1}></div>
            <div className={classes.MainInfo}>
                <div className={classes.title}>Добро пожаловать в наш клум <b className={classes.nameInfo}>ENERGY GUM</b></div>
                <div className={classes.title}>Присоединяйся</div>
                <div className={classes.title}><b className={classes.nameInfo}>и достигай вершин вместе с нами</b></div>
            </div>
            

        </div>
    );
};

export default StartPage;