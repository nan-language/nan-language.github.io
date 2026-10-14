declare module "virtual:spec" {
  export type Chapter = {
    slug: string;
    title: string;
    load: () => Promise<{ default: string }>;
  };
  export const commit: string;
  export const source: string;
  export const chapters: Chapter[];
}
