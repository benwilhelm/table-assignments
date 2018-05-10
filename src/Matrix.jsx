import React from 'react'

export default (props) => {

  const { tables, tablesMin, jurorsMin } = props
  const theight = tables.length
  const twidth  = tables[0].length

  const tableTotals = tables.map(t => t.reduce((x, y) => x + y))
  const jurorTotals = tables.reduce((acc, curr) => {
    curr.forEach((j, i) => {
      acc[i] = acc[i] || 0
      acc[i] += j
    })
    return acc
  }, [])

  return <table className="table juryMatrix">
    <thead>
      <tr>
        <th>Tables</th>
        <th colSpan={twidth + 1}>Jurors</th>
      </tr>
      <tr>
        <th></th>
        {tables[0].map((_, i) => {
          return <th>{i + jurorsMin}</th>
        })}
        <th>J/T</th>
      </tr>
    </thead>

    <tbody>
      {tables.map((table, tableIndex) => {
        const tableId = tableIndex + tablesMin
        return (
          <tr>
            <th>{tableId}</th>
            { table.map((juror, jurorIndex) => {
              return <td className={ juror ? 'x' : ''}></td>
            }) }
            <td>{tableTotals[tableIndex]}</td>
          </tr>
        )
      })}
      <tr>
        <th>T/J</th>
        {jurorTotals.map(j => (
          <td>{j}</td>
        ))}
      </tr>
    </tbody>
  </table>
}
