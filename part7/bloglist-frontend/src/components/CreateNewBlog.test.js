import React from 'react'
import CreateNewBlog from './CreateNewBlog'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { prettyDOM } from '@testing-library/dom'

const handleNewBlog = jest.fn()
let component
beforeEach(() => {
  component = render(<CreateNewBlog handleNewBlog={handleNewBlog} />)
})

describe('<CreateNewBlog />', () => {
  test('form calls the even handler it received as props with the right details when a new blog is called', () => {
    const inputUrl = component.container.querySelector('#url')
    const inputAuthor = component.container.querySelector('#author')
    const inputTitle = component.container.querySelector('#title')
    const submitButton = component.getByText('Create')
    const formValues = {
      url: 'bloomberg.com',
      title: 'HOW TO GET RICH QUICK',
      author: 'Karloz',
    }
    fireEvent.change(inputUrl, {
      target: { value: formValues.url },
    })
    fireEvent.change(inputAuthor, {
      target: { value: formValues.author },
    })
    fireEvent.change(inputTitle, {
      target: { value: formValues.title },
    })
    fireEvent.click(submitButton)
    expect(handleNewBlog.mock.calls).toHaveLength(1)
    expect(handleNewBlog.mock.calls[0][0]).toEqual(formValues)
  })
})
