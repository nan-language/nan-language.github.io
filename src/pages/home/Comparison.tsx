import { Fragment } from "react";
import { comparison } from "./content";
import section from "./section.module.css";
import styles from "./Comparison.module.css";

const languages = [
  { key: "nan", name: "NaN" },
  { key: "rust", name: "Rust" },
  { key: "cpp", name: "C++" },
] as const;

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <span className={styles.yes} role="img" aria-label="Yes">
      ✓
    </span>
  ) : (
    <span className={styles.no} role="img" aria-label="No">
      –
    </span>
  );
}

export function Comparison() {
  return (
    <section id="why" className={section.section}>
      <h2 className={section.title}>
        Systems speed. <span>Built for agents.</span>
      </h2>
      <p className={section.lead}>
        NaN aims to match Rust and C++ on speed. Where it differs is everything
        else: it is built so an agent can read, check and ship code without
        guessing.
      </p>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td />
              {languages.map(({ key, name }) => (
                <th key={key} scope="col" className={styles[key]}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map(({ group, rows }) => (
              <Fragment key={group}>
                <tr className={styles.group}>
                  <th scope="rowgroup">{group}</th>
                  {languages.map(({ key }) => (
                    <td key={key} className={styles[key]} />
                  ))}
                </tr>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">
                      <span className={styles.label}>{row.label}</span>
                      <span className={styles.detail}>{row.detail}</span>
                    </th>
                    {languages.map(({ key }) => (
                      <td key={key} className={styles[key]}>
                        <Mark yes={row[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
