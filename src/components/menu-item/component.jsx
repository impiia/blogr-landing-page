import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';
import classNames from 'classnames';

export const MenuItem = ({ title, subItems }) => {
  const [coordinates, setCoordinates] = useState(null);
  const menuItemRef = useRef();
  const popoverContainer = useRef(null);

  const toggleCartModal = () => {
    if (coordinates) {
      setCoordinates(null);
      return;
    }
    const { bottom, left } = menuItemRef.current.getBoundingClientRect();
    setCoordinates({ left: left, top: bottom });
  };

  useEffect(() => {
    const handleResize = () => {
      if (coordinates) {
        const { bottom, left } = menuItemRef.current.getBoundingClientRect();
        setCoordinates({ left: left, top: bottom });
      }
    };
    window.addEventListener("resize", handleResize);
    const handleClickOutside = (event) => {
      if (coordinates && !menuItemRef.current.contains(event.target) && !popoverContainer.current.contains(event.target)) {
        setCoordinates(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [coordinates]);

  useEffect(() => {
    popoverContainer.current = document.getElementById("popover-container");
  }, []);

  return (
    <div ref={menuItemRef} className={styles.root} onClick={toggleCartModal}>
        {title}
        <img
          src={ArrowIcon}
          alt="arrow"
          className={classNames(styles.icon, { [styles.up]: coordinates })}
        />

      {coordinates &&
        createPortal(
          <div style={coordinates} className={styles.popoverContainer}>
            <Dropdown items={subItems} />
          </div>,
          popoverContainer.current
        )}
    </div>
  );
};


