import { useRef, useState, useCallback, useEffect } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';
import classNames from 'classnames';
import { useMediaQuery } from './use-media-query';
import { useOnClickOutside } from './use-on-click-outside';

const MOBILE_WIDTH = 770;

export const MenuItem = ({ title, subItems }) => {
  const menuItemRef = useRef();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const popoverContainer = document.getElementById("popover-container");

  const calculateCoordinates = useCallback(() => {
    if (menuItemRef.current) {
      const { bottom, left } = menuItemRef.current.getBoundingClientRect();
      return { left, top: bottom };
    }
    return null;
  }, []);

  // обновляем координаты при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && !isMobile) {
        setCoordinates(calculateCoordinates());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, isMobile, calculateCoordinates]);

  useOnClickOutside(menuItemRef, () => setIsOpen(false), isMobile);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevIsOpen => {
      if (!prevIsOpen) {
        setCoordinates(calculateCoordinates());
      }
      return !prevIsOpen;
    });
  }, [calculateCoordinates]);

  return (
    <div ref={menuItemRef} className={styles.root} onClick={toggleMenu} aria-expanded={isOpen}>
      {title}
      <img
        src={ArrowIcon}
        alt="arrow"
        className={classNames(styles.icon, { [styles.up]: isOpen })}
      />
      {isMobile ? (
        isOpen && (
          <div className={styles.dropdown_menu}>
            <Dropdown items={subItems} />
          </div>
        )
      ) : (
        isOpen && popoverContainer && createPortal(
          <div style={coordinates} className={styles.popoverContainer}>
            <Dropdown items={subItems} />
          </div>,
          popoverContainer
        )
      )}
    </div>
  );
};
