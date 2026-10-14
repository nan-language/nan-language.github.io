import { useEffect, useState, type CSSProperties } from "react";
import { CodeWindow } from "./CodeWindow";
import styles from "./AnnotatedCode.module.css";

export type Annotation = {
  line: number;
  keyword: string;
  title: string;
  body: string;
};

const CYCLE_MS = 5000;

export function AnnotatedCode({
  file,
  code,
  annotations,
}: {
  file: string;
  code: string;
  annotations: Annotation[];
}) {
  const [active, setActive] = useState(0);
  const [cycling, setCycling] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!cycling) return;
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % annotations.length),
      CYCLE_MS,
    );
    return () => clearTimeout(timer);
  }, [active, cycling, annotations.length]);

  const select = (index: number) => {
    setActive(index);
    setCycling(false);
  };

  return (
    <div
      className={styles.showcase}
      style={{ "--cycle": `${CYCLE_MS}ms` } as CSSProperties}
    >
      <CodeWindow
        file={file}
        code={code}
        activeLine={annotations[active].line}
      />
      <ul className={styles.notes}>
        {annotations.map((annotation, index) => (
          <li key={annotation.line}>
            <button
              type="button"
              className={styles.note}
              aria-pressed={index === active}
              onClick={() => select(index)}
              onMouseEnter={() => select(index)}
              onFocus={() => select(index)}
            >
              <span className={styles.keyword}>
                {annotation.keyword} · line {annotation.line}
              </span>
              <span className={styles.title}>{annotation.title}</span>
              <span className={styles.body}>{annotation.body}</span>
              {cycling && index === active && (
                <span className={styles.progress} key={active} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
