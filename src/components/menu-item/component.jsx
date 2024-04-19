import { useCallback, useEffect, useRef, useState } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';
import classNames from 'classnames';

export const MenuItem = ({ title, subItems }) => {
  const menuItemRef = useRef(); 
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770); 

  const handleClick = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 770);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (isOpen && !menuItemRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleResize, handleClickOutside]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 770);
    function handleResize() {
      setIsMobile(window.innerWidth <= 770);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Вычисление координат при открытии подменю
  const getCoordinates = useCallback(() => {
    if (menuItemRef.current && !isMobile) {
      const { bottom, left } = menuItemRef.current.getBoundingClientRect();
      return { left, top: bottom };
    }
    // Обеспечиваем позиционирование в мобильной версии или когда menuItemRef.current не доступен
    return { left: 0, top: 0 };
  }, [isMobile]);

  return (
    <div ref={menuItemRef} className={styles.root} onClick={handleClick}>
      {title}
      <img
        src={ArrowIcon}
        alt="arrow"
        className={classNames(styles.icon, { [styles.up]: isOpen })}
      />
      {isMobile && isOpen && (
        <div className={styles.dropdown_menu}>
          <Dropdown items={subItems} />
        </div>
      )}

      {!isMobile && isOpen && createPortal(
        <div style={getCoordinates()} className={styles.popoverContainer}>
          <Dropdown items={subItems} />
        </div>,
        document.body // Используем document.body для портала
      )}
    </div>
  );
};