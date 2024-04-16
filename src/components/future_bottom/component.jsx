import styles from './styles.module.scss';
import bgImage from '../../assets/illustration-laptop-desktop.svg';
import { TextCard } from '../text-card/component';

export const FutureBottom = () => {
    return (
        <section className={styles.root}>
            <div className={styles.columns}>
                <div className={styles.image_container}>
                    <img src={bgImage} ></img>
                </div>
                <div className={styles.text_bloks}>
                    <TextCard
                        title="Free, open, simple"
                        text="Blogr is a free and open source application backed by a large community of neiptual developers. It supports features such as code syntax highlighting, RSS feeds, social media integration, third-party commenting tools, and works seamlessly with Google Analytics. Its architecture is clean and is relatively easy to learn."
                    />
                    <TextCard
                        title="Powerful tooling"
                        text="Batteries included. We built a simple and straightforward CLI tool that makes customization and deployment a breeze, but capable of producing even the most complicated sites."
                    />
                </div>

            </div>
        </section>
    );
}