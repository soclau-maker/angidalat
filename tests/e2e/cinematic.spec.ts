import {test,expect} from '@playwright/test';
test('3D tilt is interactive and reduced motion disables it',async({page},info)=>{
 await page.goto('/');
 const hero=page.locator('.hero-visual');
 if(info.project.name==='desktop'){
  const box=(await hero.boundingBox())!;
  await page.mouse.move(box.x+box.width*.7,box.y+box.height*.4);
  await expect.poll(()=>hero.evaluate(el=>el.style.getPropertyValue('--ry'))).not.toBe('');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(hero).toHaveCSS('transform','none');
 await expect(page.locator('h1')).toBeVisible();
});
test('background and all eight food images load',async({page})=>{
 await page.goto('/');
 const response=await page.request.get('/images/dalat-mist-background.webp');
 expect(response.ok()).toBeTruthy();
 expect(response.headers()['content-type']).toContain('image/webp');
 const cards=page.locator('.dish-card');
 await expect(cards).toHaveCount(8);
 for(const card of await cards.all()){
  await card.scrollIntoViewIfNeeded();
  await expect.poll(()=>card.locator('img').evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBeTruthy();
 }
});
