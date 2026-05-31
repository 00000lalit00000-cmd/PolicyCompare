export interface PolicySection {
  title: string;
  content: string;
}

export interface Policy {
  id: string;
  title: string;
  description?: string;
  category?: string;
  effective_date?: string;
  issuer?: string;
  tags?: string[];
  sections?: PolicySection[];
  last_updated?: string;
  source_url?: string;
}
