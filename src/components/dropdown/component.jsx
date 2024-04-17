import styles from "./styles.module.scss";

export const Dropdown = ({ items }) => {
  return (
    <ul className={styles.root}>
      {items.map((item, index) => (
        <li className={styles.item} key={index}>{item}</li>
      ))}
    </ul>
  );
};