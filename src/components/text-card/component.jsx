import classNames from "classnames";
import styles from "./styles.module.scss";
export const TextCard = ({title, text, className}) =>{
    return (
        <div className={classNames(styles.root,className)}>
        <h3 className={styles.title}>
            {title}
        </h3>
        <span className={styles.text}>
            {text}
        </span>
    </div>
    );
}