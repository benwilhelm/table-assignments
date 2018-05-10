import React, { Component } from 'react';
import NumericInput from './NumericInput.jsx'
import Assignments from './Assignments.jsx'
import Matrix from './Matrix.jsx'
import _ from 'lodash'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      jurorsMin: 1,
      jurorsMax: 1,
      tablesMin: 1,
      tablesMax: 1,
      evalsPerTable: 1
    }
  }

  handleNumericChange = (e) => {
    const newState = {...this.state}
    newState[e.target.name] = +e.target.value
    newState.jurorsMin = Math.max(1, newState.jurorsMin)
    newState.tablesMin = Math.max(1, newState.tablesMin)
    newState.jurorsMax = Math.max(newState.jurorsMin, newState.jurorsMax)
    newState.tablesMax = Math.max(newState.tablesMin, newState.tablesMax)
    this.setState(newState)
  }

  render() {

    const numJurors = (this.state.jurorsMax + 1) - this.state.jurorsMin // inclusive
    const numTables = (this.state.tablesMax + 1) - this.state.tablesMin // inclusive
    const totalEvals = (this.state.evalsPerTable) * numTables
    const evalsPerJuror = totalEvals / numJurors
    const assignmentsByTable = generateAssignmentsByTable(numTables, numJurors, this.state.evalsPerTable)
    const assignmentsByJuror = _.zip.apply(_, assignmentsByTable)


    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4 variables">
            <h2>Variables</h2>
            <div className="row">
              <div className="col-sm-4">
                <p>Jurors</p>
              </div>
              <div className="col-sm-8">
                <NumericInput name="jurorsMin"
                  value={this.state.jurorsMin}
                  onChange={this.handleNumericChange}
                />
                <span> through </span>
                <NumericInput name="jurorsMax"
                  value={this.state.jurorsMax}
                  onChange={this.handleNumericChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <p>Tables</p>
              </div>
              <div className="col-sm-8">
                <NumericInput name="tablesMin"
                  value={this.state.tablesMin}
                  onChange={this.handleNumericChange}
                />
                <span> through </span>
                <NumericInput name="tablesMax"
                  value={this.state.tablesMax}
                  onChange={this.handleNumericChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <p>Evals/Juror</p>
              </div>
              <div className="col-sm-8">
                <p>{evalsPerJuror.toFixed(2)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <p>Total Evals</p>
              </div>
              <div className="col-sm-8">
                <p>{totalEvals}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <p>Evals/Table</p>
              </div>
              <div className="col-sm-8">
                <NumericInput name="evalsPerTable"
                  value={this.state.evalsPerTable}
                  onChange={this.handleNumericChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h2>Juror Assignments</h2>
            <Assignments assignments={assignmentsByJuror} {...this.state} />
          </div>
        </div>
        <div className="row">
          <h2>Jury Matrix</h2>
          <Matrix tables={assignmentsByTable} {...this.state} />
        </div>
      </div>
    );
  }
}

export function generateAssignmentsByTable(numTables, numJurors, evalsPerTable) {
  let nextJuror = 0
  const assignments = []
  for (let tableNum=0; tableNum < numTables; tableNum++) {
    const table = Array(numJurors).fill(0)
    for (let slot=0; slot < evalsPerTable; slot++) {
      const juror = nextJuror % numJurors
      table[juror] = 1
      nextJuror = juror + 1
    }
    assignments.push(table)
  }

  return assignments
}

export default App;
