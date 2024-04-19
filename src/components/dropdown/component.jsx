import classNames from "classnames";
import styles from "./styles.module.scss";

export const Dropdown = ({ items, className }) => {
  return (
    <ul className={classNames(styles.root, className)}>
      {items.map((item, index) => (
        <li className={styles.item} key={index}>{item}</li>
      ))}
    </ul>
  );
};