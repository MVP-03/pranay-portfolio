export type ProjectCategory = "Personal" | "Engineering & Product" | "Cybersecurity" | "Machine Learning";

export interface Project {
  slug: string;
  /** Full title, shown on the case-study page. */
  title: string;
  /**
   * Short title for card display - keeps the card scannable when the full
   * title is long. Falls back to `title` if omitted.
   */
  cardTitle?: string;
  /** One-line outcome statement - what shipped/changed, not a feature list. */
  outcomeLine: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  category: ProjectCategory;
  /** Shown on the homepage "Featured projects" preview. */
  featured?: boolean;
}
