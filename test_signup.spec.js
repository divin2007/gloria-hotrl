import { test, expect } from '@playwright/test';

test('Signup page test', async ({ page }) => {
  // Go to signup page
  await page.goto('http://localhost:5173/signup');

  // Wait for the page to load
  await expect(page.locator('h1')).toContainText('Join the Legacy');

  // Generate a random email to avoid "User already registered" errors
  const randomSuffix = Math.floor(Math.random() * 1000000);
  const email = `testuser${randomSuffix}@example.com`;

  console.log(`Attempting signup with email: ${email}`);

  // Fill the form
  await page.fill('input[placeholder="John Doe"]', 'Test User');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', 'Password123!');

  // Capture console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  // Click signup
  await page.click('button[type="submit"]');

  // Wait for navigation or message
  // If email confirmation is off, it might redirect to /dashboard/guest or home
  // If email confirmation is on, it stays on page with a message

  await page.waitForTimeout(5000); // Wait for async process

  await page.screenshot({ path: 'signup_result.png', fullPage: true });

  // Check for common error messages in the UI
  const bodyText = await page.innerText('body');
  console.log('Final Page Content snippet:', bodyText.substring(0, 500));

  if (bodyText.includes('Check your email') || bodyText.includes('Success')) {
    console.log('Signup appears successful (Confirmation sent or direct success)');
  } else if (bodyText.includes('error') || bodyText.includes('Error') || bodyText.includes('failed')) {
    console.error('Signup might have failed. See screenshot.');
  }
});
