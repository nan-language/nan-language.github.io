import type { ReactNode } from "react";
import { DiscordIcon, GitHubIcon } from "../../components/icons";
import { Logo } from "../../components/Logo";
import { links } from "../../links";
import section from "./section.module.css";
import styles from "./Community.module.css";

type Channel = {
  Icon: () => ReactNode;
  action: string;
  body: string;
  href: string;
};

const channels: Channel[] = [
  {
    Icon: GitHubIcon,
    action: "View on GitHub",
    body: "Read the source, try the language and send pull requests, from new features to bug fixes.",
    href: links.repository,
  },
  {
    Icon: DiscordIcon,
    action: "Join the Discord",
    body: "Share ideas, ask questions, make content about NaN and show what you build with it.",
    href: links.discord,
  },
];

export function Community() {
  return (
    <section id="community" className={section.section}>
      <div className={styles.panel}>
        <div className={styles.mark} aria-hidden="true">
          <Logo />
        </div>
        <h2 className={styles.title}>Build NaN with us</h2>
        <ul className={styles.channels}>
          {channels.map(({ Icon, action, body, href }) => (
            <li key={href}>
              <a className={styles.channel} href={href}>
                <Icon />
                <span className={styles.action}>{action}</span>
                <span className={styles.body}>{body}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
