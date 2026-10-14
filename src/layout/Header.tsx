import { Logo } from "../components/Logo";
import { SocialLinks } from "../components/SocialLinks";
import { links, pages } from "../links";
import styles from "./Header.module.css";

const navigation = [
  { href: pages.gettingStarted, label: "Getting started" },
  { href: pages.spec, label: "Specification" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href={pages.home} className={styles.brand} aria-label="NaN, home">
          <Logo className={styles.logo} />
        </a>
        <nav className={styles.nav} aria-label="Pages">
          {navigation.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={location.pathname === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className={styles.end}>
          <div className={styles.socials}>
            <SocialLinks />
          </div>
          <a className={styles.join} href={links.discord}>
            Join the Discord
          </a>
        </div>
      </div>
    </header>
  );
}
