import { AnnotatedCode } from "../../components/AnnotatedCode";
import button from "../../components/Button.module.css";
import { Cursor } from "../../components/Cursor";
import { GitHubIcon } from "../../components/icons";
import { links, pages } from "../../links";
import { annotations, sample } from "./content";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.kicker}>Not a number. A language.</p>
        <h1 className={styles.title}>
          Fast like Rust and C++.{" "}
          <span className={styles.line}>
            Made for AI.
            <Cursor />
          </span>
        </h1>
        <div className={styles.intro}>
          <p className={styles.lead}>
            NaN aims for the performance of Rust and C++: native code, no
            garbage collector, no mandatory runtime. Unlike them, it is designed
            for AI agents from the first line. Every line carries its own
            meaning, a prover checks every contract and every tool speaks to
            agents.
          </p>
          <div className={styles.actions}>
            <a className={button.primary} href={pages.gettingStarted}>
              Get started
              <span aria-hidden="true">→</span>
            </a>
            <a className={button.secondary} href={links.repository}>
              <GitHubIcon />
              View on GitHub
            </a>
          </div>
        </div>
        <AnnotatedCode
          file="meter.nan"
          code={sample}
          annotations={annotations}
        />
      </div>
    </section>
  );
}
