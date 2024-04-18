import styles from './styles.module.scss';
import bgImage from '../../assets/bg-pattern-circles.svg';
import phonesImage from '../../assets/illustration-phones.svg';
import { TextCard } from '../text-card/component';

export const State = () => {
    return (
        <section className={styles.root} style={{ backgroundImage: `url(${bgImage})` }}>
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    <img src={phonesImage} className={styles.image} alt="Phones Image"/>
                    <TextCard  className={styles.text_card}
                        title="State of the Art Infrastructure"
                        text="With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. This ensures your site will load instantly, no matter where your readers are, keeping your site competitive."
                    />
                </div>
            </div>
        </section>
    );
}
