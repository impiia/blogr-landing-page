import { Button } from '../button/component';
import styles from './styles.module.scss';
import bgImage from '../../assets/path.svg';

export const Intro = () => {
    return (
        <div className={styles.root}>
            <div className={styles.bg_image} style={{ backgroundImage: `url(${bgImage})` }}>
                <h1 className={styles.title}>A modern publishing platform</h1>
                <span className={styles.slogan}>Grow you audience and build your brand</span>
                <div>
                    <Button title='Start for free' color='transparent' className={styles.start_button}/>
                    <Button title='Learn more' color='white'/>
                </div>
            </div>
        </div>
    );
}