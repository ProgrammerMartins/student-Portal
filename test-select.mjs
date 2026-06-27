import { chromium } from 'playwright'

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()))
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message))

  await page.goto('http://localhost:5181/login')

  await page.fill('input#email', 'student@university.edu')
  await page.fill('input#password', 'password')
  await page.click('button[type="submit"]')

  await page.waitForURL('**/register', { timeout: 5000 })
  console.log('Reached register page:', page.url())

  // Personal step
  await page.setInputFiles('input#passport', 'test-passport.png')
  await page.getByLabel('Full Name').fill('John Doe')
  await page.click('[id="Gender"]')
  await page.click('[role="option"]:has-text("Male")')
  await page.getByLabel('Date of Birth').fill('2000-01-01')
  await page.getByLabel('Nationality').fill('Nigerian')
  await page.getByLabel('State of Origin').fill('Lagos')
  await page.getByLabel('Local Government Area').fill('Ikeja')
  await page.getByLabel('Residential Address').first().fill('123 Street')
  await page.getByLabel('Email Address').first().fill('john@example.com')
  await page.getByLabel('Phone Number').first().fill('08012345678')
  await page.click('button:has-text("Next")')
  await page.waitForTimeout(600)

  // Parent step
  await page.getByLabel('Parent/Guardian Full Name').fill('Jane Doe')
  await page.getByLabel('Relationship').first().fill('Mother')
  await page.getByLabel('Phone Number').fill('08087654321')
  await page.getByLabel('Residential Address').nth(1).fill('123 Street')
  await page.click('button:has-text("Next")')
  await page.waitForTimeout(600)

  // Emergency step
  await page.getByLabel('Contact Name').fill('Jim Doe')
  await page.getByLabel('Relationship').nth(1).fill('Brother')
  await page.getByLabel('Phone Number').fill('08011112222')
  await page.getByLabel('Residential Address').nth(1).fill('123 Street')
  await page.click('button:has-text("Next")')
  await page.waitForTimeout(600)

  // Academic step
  console.log('Current URL before faculty click:', page.url())
  console.log('Attempting to select Faculty...')
  await page.click('[id="Faculty"]')
  await page.waitForTimeout(300)
  await page.click('[role="option"]:has-text("Science")')
  await page.waitForTimeout(500)

  const facultyText = await page.textContent('[id="Faculty"] [data-slot="select-value"]')
  console.log('Faculty value after selection:', facultyText)

  const deptDisabled = await page.evaluate(() => {
    const btn = document.querySelector('[id="Department"]')
    return btn ? btn.disabled : null
  })
  console.log('Department disabled?', deptDisabled)

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
