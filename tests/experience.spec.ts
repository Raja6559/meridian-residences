import { test, expect, type Page } from '@playwright/test';

async function open(page: Page) { await page.goto('/'); await expect(page.getByRole('heading', { name: 'Space for what comes next.' })).toBeVisible(); }

test('viewing preview traps focus, restores it and sends no submissions', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', r => {
    const infrastructureBeacon = new URL(r.url()).pathname === '/cdn-cgi/rum';
    if (!['GET','HEAD'].includes(r.method()) && !infrastructureBeacon) writes.push(r.url());
  });
  await open(page);
  const trigger = page.getByRole('button', { name: 'Preview a viewing' }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('no real viewing can be booked');
  await expect(dialog.locator('input, textarea, form')).toHaveCount(0);
  for (let i = 0; i < 7; i++) { await page.keyboard.press('Tab'); expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true); }
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused();
  await trigger.press('Enter'); await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Back to the spaces' }).click();
  expect(writes).toEqual([]);
});

test('gallery supports keyboard wraparound and restores thumbnail focus', async ({ page }) => {
  await open(page);
  const trigger = page.getByRole('button', { name: 'View The setting' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading')).toHaveText('The setting');
  await page.keyboard.press('ArrowLeft'); await expect(dialog.getByRole('heading')).toHaveText('Material language');
  await expect(dialog).toContainText('AI-generated concept image');
  await page.keyboard.press('ArrowRight'); await expect(dialog.getByRole('heading')).toHaveText('The setting');
  await dialog.getByRole('button', { name: 'Next image' }).click(); await expect(dialog.getByRole('heading')).toHaveText('Light, lived in');
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true); }
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused();
});

test('mobile navigation dismisses with Escape and follows section links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await open(page);
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Escape'); await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded','false');
  await toggle.click(); await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Gallery' }).click();
  await expect(page).toHaveURL(/#gallery$/); await expect(toggle).toHaveAttribute('aria-expanded','false');
});

for (const width of [320,390,430,1440]) test(`layout and images at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 }); await open(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/meridian-${width}.png`, fullPage: true });
});

test('reduced motion and blocked animation keep all sequence images visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' }); await open(page);
  await expect(page.locator('.sequence-moment')).toHaveCount(3);
  for (const el of await page.locator('.sequence-moment').all()) { await el.scrollIntoViewIfNeeded(); await expect(el).toBeVisible(); }
  await expect(page.locator('#sequence')).not.toHaveClass(/is-choreographed/);
});

test('animation failure keeps a usable static page', async ({ page }) => {
  await page.route('**/*gsap*', route => route.abort());
  await open(page); await page.locator('#sequence').scrollIntoViewIfNeeded();
  await expect(page.locator('#sequence')).not.toHaveClass(/is-choreographed/);
  await expect(page.locator('.sequence-moment')).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Preview a viewing' }).first()).toBeEnabled();
});

test('desktop choreography resets when resized to mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await open(page);
  await expect(page.locator('#sequence')).toHaveClass(/is-choreographed/);
  await page.locator('.sequence-step').last().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.sequence-frame').last().evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(.95);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#sequence')).not.toHaveClass(/is-choreographed/);
  await expect(page.locator('.sequence-moment')).toHaveCount(3);
});

test('fictional disclosure, noindex, safe links and unknown route', async ({ page }) => {
  await open(page);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  await expect(page.getByText('Fictional residential concept by Krelyvo Studio.', { exact: true }).first()).toBeVisible();
  await expect(page.locator('a[href^="tel:"],a[href*="wa.me"],form')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'View the Krelyvo case study' })).toHaveAttribute('href','https://krelyvo.com/work/meridian-residences');
  const response = await page.goto('/not-a-residence'); expect(response?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Return to Meridian' })).toBeVisible();
});

test('server-rendered content remains visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled:false });
  const page = await context.newPage();
  await page.goto(process.env['DEMO_BASE_URL'] || 'http://127.0.0.1:8086');
  await expect(page.getByRole('heading', { name:'Space for what comes next.' })).toBeVisible();
  await expect(page.locator('#sequence')).not.toHaveClass(/is-choreographed/);
  await expect(page.locator('.sequence-moment')).toHaveCount(3);
  await expect(page.getByRole('link', { name:'Explore the spaces' })).toHaveAttribute('href','#spaces');
  await context.close();
});

test('dialogs fit a narrow phone and remain scrollable', async ({ page }) => {
  await page.setViewportSize({ width:320,height:568 }); await open(page);
  await page.getByRole('button',{name:'Preview a viewing'}).filter({visible:true}).first().click();
  let dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  await dialog.getByRole('button',{name:'Back to the spaces'}).click();
  await page.getByRole('button',{name:'View The setting'}).click();
  dialog = page.getByRole('dialog');
  expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  await expect(dialog.getByRole('button',{name:'Next image'})).toBeInViewport();
  await page.keyboard.press('Escape');
});
