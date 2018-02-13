import React, { Component } from 'react'
import Splash from './Splash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { makeData, Logo, Tips } from "./Utils";
import { browserHistory } from 'react-router'
import matchSorter from 'match-sorter'
var dateFormat = require('dateformat');
const timeConverter = {'8 am' : 8, '9 am' : 9, '10 am' : 10, '11 am' : 11, '12 pm' : 12, '1 pm' : 13, '2 pm' : 14, '3 pm' : 15, '4 pm' : 16, '5 pm' : 17, '6 pm' : 18, '7 pm' : 19, '8 pm' : 20, }

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {}
  }

  render() {
    const { user, allLogs }= this.props
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
                  Cell: row => {
                    if(row.value[5] == 0) {
                      return row.value.slice(6) + '-' + row.value.slice(2,4)
                    }
                    return row.value = row.value.slice(5) + '-' + row.value.slice(2,4)
                  },
                  sortMethod: (a, b) => {
                    if (a === b) {
                      return 0;
                    }
                    return a > b ? 1 : -1;
                  },
                  filterMethod: (filter, row) => {
                    let val = row[filter.id]
                    if(val[5] == 0) {
                      val =  val.slice(6) + '-' + val.slice(2,4)
                    } else {
                      val = val.slice(5) + '-' + val.slice(2,4)
                    }
                    return val.startsWith(filter.value)
                  },
                },             
                {
                  Header: "Time",
                  accessor: "time",
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString()),
                  sortMethod: (a, b) => {
                    if (timeConverter[a] === timeConverter[b]) {
                      return 0;
                    }
                    return timeConverter[a] > timeConverter[b] ? 1 : -1;
                  }
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







