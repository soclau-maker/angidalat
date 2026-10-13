import {test,expect} from '@playwright/test';
test('featured dish is selected at page load with matching photo, name and link',async({page})=>{
 await page.addInitScript(()=>{Math.random=()=>.99;});
 await page.goto('/');
 await expect(page.locator('.hero-caption')).toHaveAttribute('href','/mon/lau-ca-tam/');
 await expect(page.locator('.hero-caption strong')).toHaveText('Lẩu cá tầm ↗');
 await expect(page.locator('.hero img')).toHaveAttribute('src','/images/lau-ca-tam.webp');
 await page.addInitScript(()=>{Math.random=()=>0;});
 await page.reload();
 await expect(page.locator('.hero-caption')).toHaveAttribute('href','/mon/nem-nuong/');
});
