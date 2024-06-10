import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'

describe('Blog', () => {
  const blog = {
    title: 'example title',
    author: 'example author',
    url: 'example url',
  }
  let container
  let createMock

  beforeEach(() => {
    createMock = vi.fn()
    container = render(<BlogForm createBlog={createMock}></BlogForm>).container
  })

  test('calls submit handler with correct information', async () => {
    let input

    input = screen.getByPlaceholderText('write title here', { exact: true })
    await userEvent.type(input, blog.title)

    input = screen.getByPlaceholderText('write author here', { exact: true })
    await userEvent.type(input, blog.author)

    input = screen.getByPlaceholderText('write url here', { exact: true })
    await userEvent.type(input, blog.url)

    const sendButton = screen.getByText('create', { exact: true })
    await userEvent.click(sendButton)

    expect(createMock.mock.calls).toHaveLength(1)
    expect(createMock.mock.calls[0][0]).toEqual(blog)
  })
})