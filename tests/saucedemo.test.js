import { test } from '@playwright/test';
import { SaucedemoPage } from '../pages/saucedemo.page.js';
import { readCSV, readProperties } from '../utilities_helper/commonOperations.js';
import path from 'path';


const locators = readProperties(path.resolve('locators/demopage.properties'));
const testDataArr = readCSV(path.resolve('./testdata.csv'));
const testData = testDataArr[0];
const validationData = testDataArr.find(row => row.cartCount !== undefined) || {};

test('Login and navigate to All Items in saucedemo', async ({ page }) => {
    const saucedemo = new SaucedemoPage(page, locators);
    await saucedemo.goto();
    await saucedemo.login(testData.username, testData.password);
    await saucedemo.openMenu();

    await saucedemo.clickAllItems();
    await saucedemo.closeMenu();

    // Assert "Sauce Lab Backpack" item is available
    await saucedemo.assertBackpackAvailable();
    await saucedemo.addBackpackToCart();
    const cartCount = validationData.cartCount ? Number(validationData.cartCount) : 1;
    console.log(`Cart count to validate: ${cartCount}`);
    // Assert cart count
    await saucedemo.assertCartCount(cartCount);
    await saucedemo.clickCartIcon();
    await saucedemo.clickCheckoutButton();

});
