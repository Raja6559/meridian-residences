import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel:'chrome' });
const page = await browser.newPage({ viewport:{ width:1440,height:1000 }, reducedMotion:'reduce' });
const baseUrl = process.env['DEMO_BASE_URL'] || 'http://127.0.0.1:8086';
await page.goto(baseUrl);
await page.locator('.hero-photo img').evaluate((img: HTMLImageElement)=>img.decode());
await page.evaluate(()=>document.fonts.ready);
console.log('Initial loaded resources',await page.evaluate(()=>performance.getEntriesByType('resource').map(entry=>({name:new URL(entry.name).pathname,bytes:(entry as PerformanceResourceTiming).encodedBodySize})).filter(entry=>entry.bytes>0)));
await page.getByRole('button',{name:'Preview a viewing'}).first().waitFor();
for (const id of ['architecture','spaces','sequence','gallery','viewing']) await page.locator(`#${id}`).scrollIntoViewIfNeeded();
for (const width of [1440,390,320]) {
  await page.setViewportSize({width,height:1000});
  for (const img of await page.locator('img:visible').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate((el: HTMLImageElement)=>el.decode()); }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:`test-results/visual-${width}.png`,fullPage:true});
  await page.screenshot({path:`test-results/hero-${width}.png`});
}
await browser.close();
