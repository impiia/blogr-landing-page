import  './styles.module.scss';

export const Dropdown = ({items}) => {
    return (
        <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };