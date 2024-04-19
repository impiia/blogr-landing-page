import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { Button } from '../button/component';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { MenuItem } from '../menu-item/component';
import HamburgerIcon from '../../assets/icon-hamburger.svg';
import CloseIcon from '../../assets/icon-close.svg';

export const AppBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        const offset = window.pageYOffset;
        if (offset > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const appBarClasses = classnames(styles.root, {
        [styles.opaque]: isScrolled,
        [styles.transparent]: !isScrolled,
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={appBarClasses}>
            <div className={styles.wrapper}>
                <a className={styles.logo}>
                    <img src={Logo} alt="logo" />
                </a>
                <div onClick={toggleMenu} className={styles.hamburger_btn}>
                    {isMenuOpen ? <img src={CloseIcon} alt="Close Icon" /> : <img src={HamburgerIcon} alt="Menu Icon" />}
                </div>
                <div className={classnames(styles.menu, { [styles.menu_open]: isMenuOpen })}>


                    <ul className={styles.menu_links}>
                        <li className={styles.menu_link}>
                            <MenuItem title="Product" subItems={["Overview", "Pricing", "Marketplace", "Features", "Integrations"]} />
                        </li>

                        <li className={styles.menu_link}>
                            <MenuItem title="Company" subItems={["About", "Team", "Blog", "Carier"]} />
                        </li>

                        <li className={styles.menu_link}>
                            <MenuItem title="Connect" subItems={["Contact", "Newsletter", "Linkedin"]} />
                        </li>

                    </ul>
                    <hr /> 
                    <div className={styles.buttons}>
                        <Button title='Login' color='transparent' className={styles.login_button} />
                        <Button title='Sign Up' color='white' />
                    </div>
                </div>

            </div>
        </div>
    );
}