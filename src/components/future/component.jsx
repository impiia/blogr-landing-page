import styles from './styles.module.scss';
import bgImage from '../../assets/illustration-editor-desktop.svg';
import { TextCard } from '../text-card/component';

export const Future = () => {
    return (
        <section className={styles.root}>
            <h2 className={styles.title}>Designed for the future</h2>
            <div className={styles.columns}>
                <div className={styles.text_bloks}>
                    <TextCard
                        title="Introducing an extensible editor"
                        text="Blog features an exceedingly intuitive interface which lets you focus on one thing: creating content. The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or change the looks of a blog."
                    />
                    <TextCard
                        title="Robust content management"
                        text="Flexible content management enables users to easily move through posts. Increase the usability of your blog by adding customized categories, sections, format, or flow. With this functionality, you're in full control."
                    />
                </div>
                <div className={styles.image_container}>
                    <img src={bgImage} ></img>
                </div>
            </div>
        </section>
    );
}