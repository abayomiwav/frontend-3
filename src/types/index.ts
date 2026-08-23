export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavMenu {
  label: string;
  items: NavLink[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
}

export type RoadmapStatus = 'done' | 'active' | 'next' | 'later';

export interface RoadmapPhase {
  quarter: string;
  title: string;
  items: string[];
  status: RoadmapStatus;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface PartyRoleDefinition {
  name: string;
  description: string;
  permissions: string[];
}
