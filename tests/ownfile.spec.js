const {test , expect}=require('@playwright/test');

test ('amazon test',async({page})=>{

    await page.goto('https://www.amazon.com/');
    await page.locator('.a-button-input').first().click();
    await page.locator('#twotabsearchtextbox').fill('Mobiles 5g');
    await page.locator('#twotabsearchtextbox').press('Enter');
    const text=await page.locator('h2.a-size-base.a-spacing-small.a-spacing-top-small.a-text-normal').locator('span').nth(0).textContent();
    const resultCount = Number(text.match(/\bover\s+([\d,]+)\s+results?\b/i)[1].replace(/,/g, ''));

    console.log(resultCount);
    expect(resultCount).toBe(30000);
    
    });

