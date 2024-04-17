import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '../../assets/icon-arrow-light.svg';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Dropdown } from '../dropdown/component';

export const MenuItem = ({ title }) => {
  const [coordinates, setCoordinates] = useState(null);
  const buttonRef = useRef();

  const toggleCartModal = () => {
    if (coordinates) {
      setCoordinates(null);
      return;
    }

    const { bottom, left } = buttonRef.current.getBoundingClientRect();

    setCoordinates({ left: left, top: bottom });
  };

  const popoverContainer = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (coordinates) {
                const { bottom, left } = buttonRef.current.getBoundingClientRect();
                setCoordinates({ left: left, top: bottom });
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [coordinates]); 

    useEffect(() => {
        popoverContainer.current = document.getElementById("popover-container");
    }, []);

  return (
    <div className={styles.root}>
      <div ref={buttonRef} onClick={toggleCartModal}>
        <span>{title}</span>
        <img src={ArrowIcon} alt="arrow" className={styles.icon} />
      </div>
      {coordinates &&
        createPortal(
          <div style={coordinates} className={styles.popoverContainer}>
            <Dropdown />
          </div>,
          popoverContainer.current
        )}
    </div>
  );
};



//   return (
//     <div className={styles.root}>
//       <div ref={ref} onClick={toggleDropdown}>
//         <span>{title}</span>
//         <img src={ArrowIcon} alt="arrow" className={styles.icon} />
//       </div>
//       {coordinates &&
//         createPortal(
//           <div className={styles.popoverContainer}>
//             {/* <Dropdown /> */}
//             <p>popover</p>
//           </div>,
//           popoverContainer.current
//         )}
//     </div>
//   );
// };

