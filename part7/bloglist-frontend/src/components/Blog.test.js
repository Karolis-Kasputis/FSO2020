import React from 'react'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { prettyDOM } from '@testing-library/dom'
jest.mock('./Blog')

describe('<Blog /> test', () => {
  let component
  const handleLikeBlog = jest.fn()
  beforeEach(() => {
    const blog = {
      url: 'delfi.lt',
      title: 'how to do stuff',
      author: 'Carlito Kasputtio',
      user: {
        id: 27,
        name: 'KAROLIS',
      },
    }
    component = render(<Blog blog={blog} handleLikeBlog={handleLikeBlog} />)
  })

  test('component doesnt render url or number by default', () => {
    const hidden = component.container.querySelector('.hiddenContent')

    expect(hidden).toHaveStyle('display: none')
  })
  test('component renders url and number when view is clicked', () => {
    const button = component.getByText('view')
    const hidden = component.container.querySelector('.hiddenContent')
    fireEvent.click(button)
    expect(hidden).toHaveStyle('display: block')
  })
  test('if like button is clicked twice, the eventhandler the component received as props is called twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLikeBlog.mock.calls).toHaveLength(2)
  })
})
