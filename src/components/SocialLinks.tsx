import { links } from "../links";
import { DiscordIcon, GitHubIcon, YouTubeIcon } from "./icons";
import styles from "./SocialLinks.module.css";

const socials = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "Discord", href: links.discord, Icon: DiscordIcon },
  { label: "YouTube", href: links.youtube, Icon: YouTubeIcon },
];

export function SocialLinks() {
  return (
    <ul className={styles.list}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            className={styles.link}
            href={href}
            aria-label={label}
            title={label}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
