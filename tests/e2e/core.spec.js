import { test, expect } from '@playwright/test';

test.describe('Niti Platform E2E', () => {
  test('Homepage loads and features are visible', async ({ page }) => {
    await page.goto('/');
    
    // Check main title
    await expect(page.locator('h1')).toContainText(/Understand|Elections/i);
    
    // Check Navigation
    await expect(page.getByRole('link', { name: 'Journey' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Eligibility' }).first()).toBeVisible();
  });

  test('Eligibility Wizard Flow', async ({ page }) => {
    await page.goto('/eligibility');
    
    await expect(page.locator('h1')).toContainText('Am I Eligible?');
    
    // Answer Yes to all three questions
    for (let i = 0; i < 3; i++) {
      await page.getByRole('button', { name: 'Yes' }).click();
    }
    
    // Verify success result
    await expect(page.locator('h2')).toContainText('You are eligible to vote!');
    await expect(page.getByText('Required Documents to Register')).toBeVisible();
  });

  test('Chatbot can be opened', async ({ page }) => {
    await page.goto('/');
    
    // Open chat
    await page.getByRole('button', { name: 'Open chat' }).click();
    
    // Verify chat UI
    await expect(page.getByText('Niti Assistant')).toBeVisible();
    await expect(page.getByPlaceholder('Ask about elections...')).toBeVisible();
    
    // Close chat
    await page.getByRole('button', { name: 'Close chat' }).click();
  });
});
