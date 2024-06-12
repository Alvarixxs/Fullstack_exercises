const { test, expect , describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({page}) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = await page.locator('.info')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')

    await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({page}) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'example title 1', 'example author 1', 'example url 1')
      await expect(page.getByText('example title 1 example author 1')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'example title 2', 'example author 2', 'example url 2')
      })

      test('blog can be viewed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('hide')).toBeVisible()
      })

      describe('and a blog is viewed', () => {
        beforeEach(async ({page}) => {
          await page.getByRole('button', { name: 'view' }).click()
        })

        test('blog can be liked', async ({page}) => {
          await page.getByRole('button', {name: 'like'}).click()
          await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('blog can be removed', async ({page}) => {
          await page.getByRole('button', {name: 'remove'}).click()
          page.on('dialog', async dialog => {
            console.log(dialog.message()); // Log the dialog message
            await dialog.accept(); // Accept the confirm dialog
          });
          await expect(page.getByText('example title 1 example author 1')).not.toBeVisible()
        })
      })

      describe('and a different user logs in', () => {
        beforeEach(async ({page, request }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await request.post('/api/users', {
            data: {
              name: 'example user 1',
              username: 'username',
              password: 'password'
            }
          })
          await loginWith(page, 'username', 'password')
        })

        test.only('blog cannot be removed', async ({page}) => {
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByText('remove')).not.toBeVisible()
        })
      })

      describe('and two more blogs exist', () => {
        beforeEach(async ({page}) => {
          await createBlog(page, 'example title 3', 'example author 3', 'example url 3')
          await createBlog(page, 'example title 4', 'example author 4', 'example url 4')
        })

        test('blog are sorted correctly', async ({page}) => {
          await page.locator('div').filter({ hasText: /^example title 2 example author 2view$/ }).getByRole('button').click()
          await page.locator('div').filter({hasText: /^example title 3 example author 3view$/}).getByRole('button').click()
          await page.locator('div').filter({ hasText: /^example title 4 example author 4view$/ }).getByRole('button').click()

          const second = await page.getByRole('button', { name: 'like' }).nth(1)
          const last = await page.getByRole('button', { name: 'like' }).last()
          await second.click()
          await second.click()

          await last.click()
          await last.click()
          await last.click()

          await expect(page.getByRole('button', { name: 'hide' }).first().locator('..')).toContainText('example author 4')
          await expect(page.getByRole('button', { name: 'hide' }).nth(1).locator('..')).toContainText('example author 3')
          await expect(page.getByRole('button', { name: 'hide' }).last().locator('..')).toContainText('example author 2')
        })
      })
    })
  })
})