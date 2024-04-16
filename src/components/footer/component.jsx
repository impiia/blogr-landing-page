import styles from './styles.module.scss';
import Logo from '../../assets/logo.svg';

export const Footer = () => {
    return (
        <section className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    <a>
                        <img className={styles.logo} src={Logo} alt="logo" />
                    </a>
                    <div>
                        <h4>Product</h4>
                        <p>Overview</p>
                        <p>Pricing</p>
                        <p>Marcetplace</p>
                        <p>Features</p>
                        <p>Integracions</p>
                    </div>

                    <div>
                        <h4>Company</h4>
                        <p>About</p>
                        <p>Team</p>
                        <p>Blog</p>
                        <p>Careers</p>
                    </div>

                    <div>
                        <h4>Connect</h4>
                        <p>Contact</p>
                        <p>Newsletter</p>
                        <p>Linkedin</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
