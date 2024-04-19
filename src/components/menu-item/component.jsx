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
    setIsOpen(prev => !prev);
  }, []);

  const toggleModal = useCallback(() => {
    if (coordinates) {
      setCoordinates(null);
      return;
    }
    const { bottom, left } = menuItemRef.current.getBoundingClientRect();
    setCoordinates({ left, top: bottom });
  }, [coordinates]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_WIDTH);
      if (coordinates) {
        const { bottom, left } = menuItemRef.current.getBoundingClientRect();
        setCoordinates({ left, top: bottom });
      }
    };

    const handleClickOutside = (event) => {
      if (popoverContainer.current && !menuItemRef.current.contains(event.target) &&
          !popoverContainer.current.contains(event.target)) {
        setCoordinates(null);
      }
    };

    const handleScroll = () => {
      setCoordinates(null);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [coordinates]);

  useEffect(() => {
    popoverContainer.current = document.getElementById("popover-container");
  }, []);

  const handleClick = () => {
    if (isMobile) {
      toggleMenu();
    } else {
      toggleModal();
    }
  };

  return (
    <div ref={menuItemRef} className={styles.root} onClick={handleClick}>
      {title}
      <img
        src={ArrowIcon}
        alt="arrow"
        className={classNames(styles.icon, { [styles.up]: coordinates || isOpen })}
      />
      {isMobile ? (isOpen && (
        <div className={styles.dropdown_menu}>
          <Dropdown items={subItems} />
        </div>
      )) : (coordinates && createPortal(
        <div style={coordinates} ref={popoverContainer} className={styles.popoverContainer}>
          <Dropdown items={subItems} />
        </div>,
        document.body
      ))}
    </div>
  );
};