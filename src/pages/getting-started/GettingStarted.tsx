import type { ReactNode } from "react";
import button from "../../components/Button.module.css";
import { CodeWindow } from "../../components/CodeWindow";
import { Shell } from "../../components/Shell";
import { Page } from "../../layout/Page";
import { links, pages } from "../../links";
import * as snippets from "./snippets";
import styles from "./GettingStarted.module.css";

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className={styles.step}>
      <h2 className={styles.stepTitle}>{title}</h2>
      <div className={styles.stepBody}>{children}</div>
    </li>
  );
}

function File({ name, code }: { name: string; code: string }) {
  return (
    <div className={styles.file}>
      <CodeWindow file={name} code={code} />
    </div>
  );
}

export function GettingStarted() {
  return (
    <Page>
      <div className={styles.page}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Getting started</h1>
          <p className={styles.lead}>
            Install NaN, run a first program and watch the prover refuse a
            broken call before it ever runs.
          </p>
        </header>
        <ol className={styles.steps}>
          <Step title="Install">
            <p>
              On Linux x86_64, the install script downloads the latest release,
              checks its SHA-256 and installs <code>nan</code> as{" "}
              <code>~/.local/bin/nan</code>.
            </p>
            <Shell session={snippets.install} />
            <p className={styles.note}>
              Programs for <code>x86_64-host</code> are linked by a C compiler
              available as <code>cc</code>.
            </p>
          </Step>
          <Step title="Run a first program">
            <p>
              A package is a directory holding a <code>package.nan</code>{" "}
              manifest. Create <code>hello/</code> with these two files.{" "}
              <code>main</code> receives the host&apos;s authority as a value
              and uses only what it needs: standard output.
            </p>
            <File name="hello/package.nan" code={snippets.manifest} />
            <File name="hello/hello.nan" code={snippets.hello} />
            <p>From the package directory:</p>
            <Shell session={snippets.run} />
          </Step>
          <Step title="Write a contract">
            <p>
              Contracts sit in the head of a function. The example runs on every
              check, and the test runs with <code>nan test</code>.
            </p>
            <File name="hello/mean.nan" code={snippets.mean} />
            <Shell session={snippets.test} />
            <p>
              Now break the contract. The prover refutes the call at check time,
              before anything runs:
            </p>
            <File name="hello/broken.nan" code={snippets.broken} />
            <Shell session={snippets.check} />
          </Step>
          <Step title="Teach your agent">
            <p>
              <code>nan primer</code> prints what an agent needs to write NaN
              without a diagnostic, in under 8,000 tokens. Give it to your
              agent, or let the agent run it. Six topics go deeper, such as{" "}
              <code>contracts</code>.
            </p>
            <Shell session={snippets.primer} />
            <table className={styles.commands}>
              <caption>Everyday commands</caption>
              <tbody>
                {snippets.commands.map(([command, purpose]) => (
                  <tr key={command}>
                    <th scope="row">
                      <code>{command}</code>
                    </th>
                    <td>{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Step>
        </ol>
        <nav className={styles.next} aria-label="Next steps">
          <a
            className={button.primary}
            href={`${pages.spec}?chapter=39-primer`}
          >
            Read the primer
          </a>
          <a className={button.secondary} href={pages.spec}>
            Browse the specification
          </a>
          <a className={button.secondary} href={links.discord}>
            Join the Discord
          </a>
        </nav>
      </div>
    </Page>
  );
}
