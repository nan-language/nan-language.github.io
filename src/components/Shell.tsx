import { useState } from "react";
import styles from "./Shell.module.css";

const PROMPT = "$ ";

export function Shell({ session }: { session: string }) {
  const lines = session.split("\n");
  const commands = lines
    .filter((line) => line.startsWith(PROMPT))
    .map((line) => line.slice(PROMPT.length));
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.shell}>
      <pre className={styles.code}>
        <code>
          {lines.map((line, row) =>
            line.startsWith(PROMPT) ? (
              <span key={row} className={styles.command}>
                <span className={styles.prompt} aria-hidden="true">
                  $
                </span>
                {line.slice(PROMPT.length)}
                {"\n"}
              </span>
            ) : (
              <span key={row} className={styles.output}>
                {line}
                {"\n"}
              </span>
            ),
          )}
        </code>
      </pre>
      <button type="button" className={styles.copy} onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
