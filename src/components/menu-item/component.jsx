import { useEffect, useRef, useState, useCallback } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';
import classNames from 'classnames';

const MOBILE_WIDTH = 770;

export const MenuItem = ({ title, subItems }) => {
  const [coordinates, setCoordinates] = useState(null);
  const menuItemRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);
  const [isOpen, setIsOpen] = useState(false);
  const popoverContainer = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => {
      if (!isMobile && !prevIsOpen) {
        const { bottom, left } = menuItemRef.current.getBoundingClientRect();
        setCoordinates({ left, top: bottom });
      } else {
        setCoordinates(null);
      }
      return !prevIsOpen;
    });
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const currentlyIsMobile = window.innerWidth <= MOBILE_WIDTH;
      if (isMobile !== currentlyIsMobile) {
        setIsMobile(currentlyIsMobile);
        if (!currentlyIsMobile) setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverContainer.current && !menuItemRef.current.contains(event.target) &&
          !popoverContainer.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    popoverContainer.current = document.getElementById("popover-container");
  }, []);

  return (
    <div ref={menuItemRef} className={styles.root} onClick={toggleMenu}>
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
        isOpen &&
        createPortal(
          <div style={coordinates} ref={popoverContainer} className={styles.popoverContainer}>
            <Dropdown items={subItems} />
          </div>,
          document.body
        )
      )}
    </div>
  );
};
