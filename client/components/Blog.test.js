import React from 'react'
//import { render, fireEvent } from '@testing-library/react'
import { render } from '../testUtils'
import { ConnectedBlog as Blog } from './Blog'

describe('Blog component', () => {
  let component

  const blog = {
    title: 'Zen and maintenance',
    author: 'Some Wise Guy',
    url: 'http://zen.and.maintenan.ce',
    likes: '66',
    user: {
      name: 'Philosopher Phil',
      username: 'philphil',
    },
    comments: [
      "Changed my life",
      "Been there, done that",
    ],
  }

  const initialState = {
    notification: {
      text: ''
    },
    blogs: [],
    user: {
      name: 'Random Tester',
      username: 'ttester',
    },
    users: [],
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
      />, { initialState }
    )
  })

  test('renders blog details', () => {
    const blogDiv = component.container.querySelector('[data-cy="blog-details"]')

    expect(blogDiv).toHaveTextContent('Zen and maintenance')
    expect(blogDiv).toHaveTextContent('Author: Some Wise Guy')
    expect(blogDiv).toHaveTextContent('Blog added by Philosopher Phil')
    expect(blogDiv).toHaveTextContent('http://zen.and.maintenan.ce')
  })

  test('renders blog comments', () => {
    const commentsDiv = component.container.querySelector('[data-cy="blog-commentlist-table"]')

    expect(commentsDiv).toHaveTextContent('Changed my life')
    expect(commentsDiv).toHaveTextContent('Been there, done that')
  })
})