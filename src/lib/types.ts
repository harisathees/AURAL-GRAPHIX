export type RichBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  industry: string;
  scope: string;
  timeline: string;
  liveSite: string | null;
  featured: boolean;
  thumbnail: string;
  gallery: readonly string[];
  overview: readonly RichBlock[];
  result: readonly RichBlock[];
  feedback: { name: string; role: string; quote: string };
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  featured: boolean;
  thumbnail: string;
  author: { name: string; avatar: string };
  content: readonly RichBlock[];
  updatedAt: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  content: readonly RichBlock[];
}
