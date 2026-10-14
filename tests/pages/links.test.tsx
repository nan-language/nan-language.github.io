import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { links, pages } from "../../src/links";
import { GettingStarted } from "../../src/pages/getting-started/GettingStarted";
import { Home } from "../../src/pages/home/Home";

test.each([
  ["home", <Home />],
  ["getting started", <GettingStarted />],
])(
  "every internal link of the %s page leads to a page of the site",
  (_, page) => {
    const { container } = render(page);
    const internal = [
      ...container.querySelectorAll<HTMLAnchorElement>('a[href^="/"]'),
    ];
    expect(internal.length).toBeGreaterThan(0);
    for (const link of internal) {
      const path = link.getAttribute("href")?.split("?")[0];
      expect(Object.values(pages), path).toContain(path);
    }
  },
);

test.each([
  [/get started/i, pages.gettingStarted],
  [/view on github/i, links.repository],
  [/join the discord/i, links.discord],
])("every %s link of the home page leads to %s", (name, href) => {
  render(<Home />);
  const actions = screen.getAllByRole("link", { name });
  expect(actions.length).toBeGreaterThan(0);
  for (const link of actions) {
    expect(link).toHaveAttribute("href", href);
  }
});
