import { useRef, useState, useCallback } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';
import classNames from 'classnames';
import { useMediaQuery } from './use-media-query';
import { useOnClickOutside } from './use-on-click-outside';
import { usePopoverPosition } from './use-popover-position';

const MOBILE_WIDTH = 770;

export const MenuItem = ({ title, subItems }) => {
  const menuItemRef = useRef();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
  const [isOpen, setIsOpen] = useState(false);
  const popoverContainer = document.getElementById("popover-container");

  const coordinates = usePopoverPosition(menuItemRef, isOpen, isMobile);

  useOnClickOutside(menuItemRef, () => setIsOpen(false), isMobile);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

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
