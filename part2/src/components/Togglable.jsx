/**
 * Define component for toggling visibility of items
 * 
 * Component is wrapped in forwardRef call to access
 * reference assigned to component.
 * 
 */
import { useState, forwardRef, useImperativeHandle } from 'react'

// 
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // make toggleVisibility function available outside of component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  // props.children is automatically added by React and always exists
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable