import React from 'react'

export default (props) => (
  <input type="number"
         name={props.name}
         className="short-number"
         value={props.value}
         onChange={props.onChange}
  />
)
