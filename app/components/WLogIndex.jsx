import React, { Component } from 'react'
import Splash from './Splash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { makeData, Logo, Tips } from "./Utils";
import { browserHistory } from 'react-router'
import matchSorter from 'match-sorter'
var dateFormat = require('dateformat');

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {}
  }

  render() {
    const { user, allLogs }= this.props
    console.log('allWeatherLogs===>', allLogs)
    return (
      <div id='wLogIndexCanvas'>
        {!user&&(
          <Splash/>
        )}
        {user&&(
          <div>
          <h1 id='wLogIndexTitle'>Weather Log Index
            <button 
              onClick={e => browserHistory.push('/showAddWeathLogModal')}
              id='addWeatherLogButt'> + Add Log Entry
            </button>
          </h1>
          <div>
        <ReactTable
          data={allLogs}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  accessor: "date",
                  sortMethod: (a, b) => {
                    if (a === b) {
                      return 0;
                    }
                    let aDate = new Date(a)
                    let bDate = new Date(b)
                    return aDate > bDate ? 1 : -1;
                  },
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
                },             
                {
                  Header: "Hour (military)",
                  accessor: "time",
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString())
                },
                {
                  Header: "Location",
                  accessor: "location",
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },             
                {
                  Header: "Wind Speed",
                  accessor: 'windSpeed',
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString())
                },
                {
                  Header: "Wind Direction",
                  accessor: 'windDirection',
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "Conditions",
                  accessor: 'conditions',
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "User",
                  accessor: 'user_Name',
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                }
              ]
            }
          ]}
          defaultPageSize={10}
          defaultSorted={[
           { id: 'date',
            desc: true
           }
          ]}
          className="-striped -highlight"
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
      </div>


        )}
      </div>
    )
  }
}






