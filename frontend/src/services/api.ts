import { Policy } from '../types/policy';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

export async function fetchPolicies(query?: string, category?: string): Promise<Policy[]> {
  const url = new URL(`${baseUrl}/policies`);
  if (query) url.searchParams.set('q', query);
  if (category) url.searchParams.set('category', category);
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Failed to load policies');
  return response.json();
}

export async function fetchPolicyById(id: string): Promise<Policy> {
  const response = await fetch(`${baseUrl}/policies/${id}`);
  if (!response.ok) throw new Error('Policy not found');
  return response.json();
}

export async function comparePolicies(ids: string[]): Promise<{ policies: Policy[] }> {
  const response = await fetch(`${baseUrl}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) throw new Error('Failed to compare policies');
  return response.json();
}
