export interface InsuranceCategory {
  slug: string;
  label: string;
  description: string;
  emoji: string;
  color: string;
  textColor: string;
}

export const INSURANCE_CATEGORIES: InsuranceCategory[] = [
  {
    slug: 'health-insurance',
    label: 'Health Insurance',
    description: 'Policies for medical care, hospitalization, and wellness benefits.',
    emoji: '🏥',
    color: '#2e7d32',
    textColor: '#ffffff',
  },
  {
    slug: 'term-insurance',
    label: 'Term Insurance',
    description: 'Life cover with simple premiums to protect your family.',
    emoji: '🛡️',
    color: '#1e88e5',
    textColor: '#ffffff',
  },
  {
    slug: 'general-insurance',
    label: 'General Insurance',
    description: 'Non-life plans for travel, personal accident, and home protection.',
    emoji: '📦',
    color: '#6a1b9a',
    textColor: '#ffffff',
  },
  {
    slug: 'car-insurance',
    label: 'Car Insurance',
    description: 'Vehicle protection for cars, liability, and collision damage.',
    emoji: '🚗',
    color: '#ef6c00',
    textColor: '#ffffff',
  },
  {
    slug: 'two-wheeler-insurance',
    label: 'Two Wheeler Insurance',
    description: 'Insurance solutions for bikes and scooters with theft cover.',
    emoji: '🏍️',
    color: '#00897b',
    textColor: '#ffffff',
  },
  {
    slug: 'travel-insurance',
    label: 'Travel Insurance',
    description: 'Cover for travel emergencies, baggage and trip cancellation.',
    emoji: '✈️',
    color: '#3949ab',
    textColor: '#ffffff',
  },
  {
    slug: 'home-insurance',
    label: 'Home Insurance',
    description: 'Home protection against fire, theft, and natural disasters.',
    emoji: '🏠',
    color: '#00838f',
    textColor: '#ffffff',
  },
];

export const CATEGORY_BY_SLUG = new Map(INSURANCE_CATEGORIES.map((category) => [category.slug, category]));

export function getCategoryLabel(slug: string): string {
  return CATEGORY_BY_SLUG.get(slug)?.label ?? slug.replace(/-/g, ' ');
}

export function getCategoryDescription(slug: string): string {
  return CATEGORY_BY_SLUG.get(slug)?.description ?? '';
}
