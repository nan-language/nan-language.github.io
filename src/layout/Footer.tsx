import { Logo } from "../components/Logo";
import { SocialLinks } from "../components/SocialLinks";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo className={styles.logo} />
      <SocialLinks />
      <span className={styles.year}>© {new Date().getFullYear()} NaN</span>
    </footer>
  );
}
