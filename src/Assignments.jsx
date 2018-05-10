import React from 'react'
import AssignmentRow from './AssignmentRow.jsx'

export default (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Juror</th>
          <th>Tables</th>
        </tr>
      </thead>
      <tbody>
        {props.assignments.map((tableIndices, jurorIndex) => {
          const jurorId = jurorIndex + props.jurorsMin
          const tableIds = tableIndices
                           .map((t, i) => (t>0) ? i + props.tablesMin : 0)
                           .filter(t => t > 0)
          return <AssignmentRow
            juror={jurorId}
            tableIds={tableIds}
            key={jurorId}
          />
        })}
      </tbody>
    </table>
  )
}
