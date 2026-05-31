import { test, expect } from '@playwright/test';

const samplePolicies = [
  {
    id: '1',
    title: 'Data Protection Policy',
    description: 'Policy describing data protection requirements.',
    effective_date: '2024-01-01',
    issuer: 'Security',
    tags: ['security', 'data'],
    sections: [
      { title: 'Purpose', content: 'Protect data.' },
      { title: 'Scope', content: 'All employees.' },
    ],
    last_updated: '2024-01-01',
    source_url: 'https://example.com/policies/data-protection',
  },
  {
    id: '2',
    title: 'Acceptable Use Policy',
    description: 'Rules for acceptable use of company resources.',
    effective_date: '2023-06-15',
    issuer: 'IT',
    tags: ['it', 'usage'],
    sections: [
      { title: 'Introduction', content: 'Use responsibly.' },
      { title: 'Prohibitions', content: 'No illegal activities.' },
    ],
    last_updated: '2023-06-15',
    source_url: 'https://example.com/policies/aup',
  },
];

test('should load policies and compare two selections', async ({ page }) => {
  page.on('console', (msg) => console.log('BROWSER LOG>', msg.text()));
  page.on('pageerror', (error) => console.log('PAGE ERROR>', error.message));
  page.on('requestfailed', (request) => console.log('REQUEST FAILED>', request.url(), request.failure()?.errorText));

  await page.route('**/api/policies*', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(samplePolicies),
    });
  });

  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await expect(page.getByText('PolicyCompare')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Policy catalog')).toBeVisible({ timeout: 15000 });

  const selectButtons = page.getByRole('button', { name: 'Select' });
  await selectButtons.nth(0).click();
  await selectButtons.nth(1).click();

  const compareButton = page.getByRole('button', { name: /Compare \(2\)/ });
  await expect(compareButton).toBeEnabled();
  await compareButton.click();

  await expect(page.getByText('Compare policies')).toBeVisible();
  await expect(page.getByText('Data Protection Policy')).toBeVisible();
  await expect(page.getByText('Acceptable Use Policy')).toBeVisible();
});
