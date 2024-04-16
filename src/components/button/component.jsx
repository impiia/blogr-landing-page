import styles from "./styles.module.scss";
import classNames from 'classnames';
import { Color } from "../../constants/colors";
export const Button = ({ title, className, color=Color.transparent }) => {
    return (
        <button className={classNames(styles.root, className, styles[color])}>{title}</button>
    )
}