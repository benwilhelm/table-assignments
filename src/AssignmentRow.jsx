import React from 'react'

export default (props) => (
  <tr>
    <th>{props.juror}</th>
    <td>{props.tableIds.join(', ')}</td>
  </tr>
)
