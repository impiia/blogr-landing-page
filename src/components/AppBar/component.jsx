import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { Button } from '../button/component';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { MenuItem } from '../menu-item/component';

export const AppBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
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

    return (
        <div className={appBarClasses}>
            <div className={styles.wrapper}>
                <ul className={styles.menu_links}>
                    <li className={styles.menu_link}>
                        <a>
                            <img className={styles.logo} src={Logo} alt="logo" />
                        </a>
                    </li>
                    <li className={styles.menu_link}>
                        <MenuItem title="Product" subItems={["Overview", "Pricing", "Marketplace", "Features", "Integrations"]} />
                    </li>

                    <li className={styles.menu_link}>
                        <MenuItem title="Company" subItems={["About", "Team", "Blog", "Carier"]}/>
                    </li>

                    <li className={styles.menu_link}>
                        <MenuItem title="Connect" subItems={["Contact", "Newsletter", "Linkedin"]} />
                    </li>

                </ul>

                <div>
                    <Button title='Login' color='transparent' className={styles.login_button} />
                    <Button title='Sign Up' color='white' />
                </div>

            </div>
        </div>
    );
}