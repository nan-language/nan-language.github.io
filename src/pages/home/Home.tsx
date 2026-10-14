import { Page } from "../../layout/Page";
import { Community } from "./Community";
import { Comparison } from "./Comparison";
import { Hero } from "./Hero";

export function Home() {
  return (
    <Page>
      <Hero />
      <Comparison />
      <Community />
    </Page>
  );
}
