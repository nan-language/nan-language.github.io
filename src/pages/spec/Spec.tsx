import { useEffect, useRef, useState } from "react";
import { chapters, commit, source } from "virtual:spec";
import { Page } from "../../layout/Page";
import { pages } from "../../links";
import styles from "./Spec.module.css";

const chapterHref = (slug: string) => `${pages.spec}?chapter=${slug}`;

function currentIndex(): number {
  const slug = new URLSearchParams(location.search).get("chapter");
  return Math.max(
    0,
    chapters.findIndex((chapter) => chapter.slug === slug),
  );
}

export function Spec() {
  const index = currentIndex();
  const chapter = chapters[index];
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const [html, setHtml] = useState<string>();
  const sidebar = useRef<HTMLElement>(null);
  const currentLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (sidebar.current && currentLink.current) {
      sidebar.current.scrollTop =
        currentLink.current.offsetTop - sidebar.current.clientHeight / 2;
    }
  }, []);

  useEffect(() => {
    document.title = `${chapter.title} · NaN specification`;
    let current = true;
    chapter.load().then((module) => {
      if (current) setHtml(module.default);
    });
    return () => {
      current = false;
    };
  }, [chapter]);

  useEffect(() => {
    if (html && location.hash) {
      document
        .getElementById(decodeURIComponent(location.hash.slice(1)))
        ?.scrollIntoView();
    }
  }, [html]);

  return (
    <Page>
      <div className={styles.layout}>
        <aside className={styles.sidebar} ref={sidebar}>
          <p className={styles.heading}>Specification</p>
          <select
            className={styles.picker}
            aria-label="Chapter"
            value={chapter.slug}
            onChange={(event) =>
              location.assign(chapterHref(event.target.value))
            }
          >
            {chapters.map(({ slug, title }) => (
              <option key={slug} value={slug}>
                {slug.slice(0, 2)} {title}
              </option>
            ))}
          </select>
          <nav aria-label="Chapters">
            <ol className={styles.chapters}>
              {chapters.map(({ slug, title }) => (
                <li key={slug}>
                  <a
                    href={chapterHref(slug)}
                    aria-current={slug === chapter.slug ? "page" : undefined}
                    ref={slug === chapter.slug ? currentLink : undefined}
                  >
                    <span className={styles.number}>{slug.slice(0, 2)}</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className={styles.main}>
          <article
            className={styles.article}
            dangerouslySetInnerHTML={html ? { __html: html } : undefined}
          />
          <footer className={styles.footer}>
            <nav className={styles.pager} aria-label="Pages">
              {previous && (
                <a href={chapterHref(previous.slug)} rel="prev">
                  <span>Previous</span>
                  {previous.title}
                </a>
              )}
              {next && (
                <a href={chapterHref(next.slug)} rel="next">
                  <span>Next</span>
                  {next.title}
                </a>
              )}
            </nav>
            <a className={styles.source} href={`${source}/${chapter.slug}.md`}>
              Source at {commit.slice(0, 7)}
            </a>
          </footer>
        </div>
      </div>
    </Page>
  );
}
