import { test, expect , Page} from '@playwright/test';
import { testData } from '../tests/Test';

const BASE_URL = 'https://www.tutorialspoint.com/selenium/practice';

async function goToPage(page: Page, pageName: string) {
    await page.goto(`${BASE_URL}/${pageName}`, {
        waitUntil: 'domcontentloaded'
    });
}
function getDateMonthsAgo(months: number): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() - months;
    const day = today.getDate();

    const targetDate = new Date(year, month, 1);

    const lastDayOfTargetMonth =
        new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();

    targetDate.setDate(Math.min(day, lastDayOfTargetMonth));

    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}


test('Task 103 - Radio Button', async ({ page }) => {
 await goToPage(page, 'text-box.php');

const radioButtonLink= page.getByRole('link', { name: 'Radio Button', exact: true });
await radioButtonLink.click();
const impressiveRadio = page.locator('input[type="radio"][value="igotthree"]');
 await impressiveRadio.check();
 await expect(impressiveRadio).toBeChecked();
});


test('Task 104 - Web Tables', async ({ page }) => {

    await goToPage(page, 'webtables.php');
    const addButton = page.getByRole('button', { name: 'Add' });
    await addButton.click();
    const modal = page.locator('#staticBackdropLive');
    const firstName = modal.locator('#firstname');
    await firstName.fill('Kariman');
    const lastName = modal.locator('#lastname');
    await lastName.fill('Kamal');
    const email = modal.locator('#email');
    await email.fill('kariman.kamal@linkdev.com');
    const age = modal.locator('#age');
    await age.fill('3098');
    const salary = modal.locator('#salary');
    await salary.fill('78888888888888888888888888888888888888888888888888888888');
    const deparment = modal.locator('#deparment');
    await deparment.fill('QC');
    await page.screenshot({ path: 'web-table-form.png' });
    await page.locator('input[type="submit"][value="Login"]').click();
    

const deleteButtons = page.locator('a.delete-wrap');

const count = await deleteButtons.count();

for (let i = 0; i < count; i++) {
    await deleteButtons.first().click();
}

await expect(deleteButtons).toHaveCount(0);

});

test('Task 105 - Buttons', async ({ page }) => {

    await goToPage(page, 'buttons.php');
const clickMeButton = page.getByRole('button', { name: 'Click Me' ,
        exact: true});

await clickMeButton.click();
 const message = page.locator('#welcomeDiv');

    await expect(message).toBeVisible();
    await expect(message).toHaveText('You have done a dynamic click');

});

test('Task 106 - Link', async ({ page }) => {

    await goToPage(page, 'links.php');
const NotFoundLink = page.getByRole('link', { name: 'Not Found' ,
        exact: true});
        await NotFoundLink.click();
         const notfoundmessage = page.locator('.nfound');

await expect(notfoundmessage).toBeVisible();
    await expect(notfoundmessage).toHaveText('Link has responded with staus 404 and status text Not Found');

});

test('Task 107 - Upload and Download', async ({ page }) => {

    await goToPage(page, 'upload-download.php');
const UploadButton = page.locator('#uploadFile');
await UploadButton.setInputFiles(testData.uploadFilePath);
await expect(UploadButton).toHaveValue(/test\.txt/);
 await page.screenshot({ path: 'upload-file-form.png' });
});

test('Task 108 - DynamicsProperties', async ({ page }) => {

    await goToPage(page, 'dynamic-prop.php');
const DynamicProperties = page.locator('#colorChange');
 await DynamicProperties.click();
 const DynamicPropertiesmessage = page.locator('#visibleAfter');
 
await expect(DynamicPropertiesmessage).toBeVisible({timeout: 7000});;
    await expect(DynamicPropertiesmessage).toHaveText('Visible After 5 Seconds');

});
test('Task 109 - Practise-form', async ({ page }) => {

await goToPage(page, 'selenium_automation_practice.php');
  
   
    const Name = page.locator('#name');
    await Name.fill('Kariman');
    const email = page.locator('#email');
    await email.fill('kariman.kamal@linkdev.com');
const femaleRadio = page
    .locator('div.col-sm-3.text-left')
    .filter({ hasText: 'Female' })
    .locator('input[type="radio"]');

await femaleRadio.check();
const mobile = page.locator('#mobile');
    await mobile.fill('01281360506');
const Birthdate = page.locator('#dob');

const twoMonthsAgo = getDateMonthsAgo(2);

await Birthdate.fill(twoMonthsAgo);
const subject = page.locator('#subjects');
    await subject.fill('Math');

const hobbiesSection = page
    .locator('div.d-flex.justify-content-start.align-center')
    .filter({ has: page.locator('#hobbies') });

const hobbies = hobbiesSection.locator('input[type="checkbox"]');

const hobbiesCount = await hobbies.count();

for (let i = 0; i < hobbiesCount; i++) {
    await hobbies.nth(i).check();
}
const pictureUpload = page.locator('input[type="file"][id="picture"]');

await pictureUpload.setInputFiles('D:\\PlaywrightAutomation\\upload-file-form.png');

const currentAddress = page.locator('textarea[id="picture"]');

await currentAddress.fill('Maadi, Cairo');
const state = page.locator('#state');
await state.selectOption({ label: 'NCR' });
const city = page.locator('#city');
await city.selectOption({ label: 'Agra' });
    await page.screenshot({ path: 'Dynamic-form.png' });

     });

    test('Task 110 - Browser Windows - New Tab', async ({ page }) => {

    await goToPage(page, 'browser-windows.php');

    const newTabButton = page.getByRole('button', {
        name: 'New Tab',
        exact: true
    });

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        newTabButton.click()
    ]);

    await newPage.waitForLoadState();
     const newTabHeading = newPage.getByRole('heading', {
        name: 'New Tab',
        exact: true
    });

    await expect(newTabHeading).toBeVisible();
    await expect(newTabHeading).toHaveText('New Tab');

});


test('Task 114 - Auto Complete', async ({ page }) => {

    await goToPage(page, 'auto-complete.php');

    const autoCompleteInput = page.locator('#tags');

    await autoCompleteInput.fill('a');

    const haskellOption = page.getByText('Haskell', { exact: true });

    await haskellOption.click();

    await expect(autoCompleteInput).toHaveValue('Haskell');
});