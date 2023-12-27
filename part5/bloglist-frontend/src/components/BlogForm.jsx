/**
 * Define component for create new blog form
 * 
 */
import { useState } from 'react'

const BlogForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        title:
        <input
          type='text'
          value={props.title}
          name='Title'
          onChange={props.handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={props.author}
          name='Author'
          onChange={props.handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={props.url}
          name='URL'
          onChange={props.handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm