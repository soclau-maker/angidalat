import { test, expect } from '@playwright/test';
test('search, filters, empty state and reset',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.dish-card:visible')).toHaveCount(3);
 await page.getByLabel('Tìm món hoặc địa chỉ').fill('MI QUANG');
 await expect(page.locator('.dish-card:visible')).toHaveCount(1);
 await expect(page.locator('.dish-card:visible h3')).toHaveText('Mì Quảng↗');
 await page.getByLabel('Tìm món hoặc địa chỉ').fill('');
 await page.getByRole('button',{name:'Món nước',exact:true}).click();
 await expect(page.locator('.dish-card:visible')).toHaveCount(2);
 await page.getByLabel('Tìm món hoặc địa chỉ').fill('nem');
 await expect(page.getByText('Chưa có món bạn tìm.')).toBeVisible();
 await page.getByRole('button',{name:'Xem tất cả món'}).click();
 await expect(page.locator('.dish-card:visible')).toHaveCount(3);
});
test('dish to restaurant, honest Maps query and SEO',async({page})=>{
 for(const slug of ['nem-nuong','mi-quang','bun-bo']){
  await page.goto(`/mon/${slug}/`);
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link',{name:'Xem thông tin quán'}).click();
  const maps=page.getByRole('link',{name:/Tìm trên Google Maps/});
  await expect(maps).toHaveAttribute('href',/maps\/search\/\?api=1&query=/);
  await expect(page.getByText('Chưa có thông tin xác minh',{exact:true})).toHaveCount(2);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',new RegExp('https://angidalat.pages.dev/quan/'));
 }
});
test('responsive layout, accessible headings, no overflow and AI image loading',async({page},info)=>{
 await page.goto('/');
 await expect(page.locator('h1')).toHaveCount(1);
 const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,window:innerWidth,columns:getComputedStyle(document.querySelector('.dish-grid')!).gridTemplateColumns.split(' ').length}));
 expect(widths.scroll).toBeLessThanOrEqual(widths.window);
 expect(widths.columns).toBe(info.project.name==='mobile'?2:3);
 if(info.project.name==='mobile'){
  expect(await page.locator('.hero').evaluate(el=>el.getBoundingClientRect().height)).toBeLessThanOrEqual(650);
 }
 await expect(page.locator('.hero img')).toBeVisible();
 expect(await page.locator('.hero img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 await page.screenshot({path:`test-results/home-${info.project.name}.png`,fullPage:true});
});
test('missing image keeps labeled placeholder; 404 is real',async({page})=>{
 await page.route('**/images/nem-nuong.webp',route=>route.abort());
 await page.goto('/');
 await expect(page.locator('.hero .image-fallback')).toBeVisible();
 await expect(page.locator('.hero img')).toBeHidden();
 const response=await page.goto('/khong-co-trang/');
 expect(response?.status()).toBe(404);
 await expect(page.locator('h1')).toContainText('Món bạn tìm');
});
