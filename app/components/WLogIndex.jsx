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
          getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        console.log('wtf',column.Header)
                        console.log('userid', user.id)
                        console.log('og', rowInfo.original.user_id)
                        console.log('uz', user)

                        if((column.Header == 'Log Entry ID' || column.Header == 'User ID')&& (user.id ===  rowInfo.original.user_id)){
                          if (confirm('Would you like delete this entry, ' + user.name + '?')) {
                            this.props.removeLogEntry(rowInfo.original.id)
                            this.props.getAllLogs()
                          } 
                        }
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      }
                    }
                  }}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  headerClassName: 'biggerHeader',
                  accessor: "date",
                  style: {'font-size': '30px'} ,               
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
                  headerClassName: 'biggerHeader',
                  accessor: "time",
                  style: {'font-size': '30px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString()),
                  sortMethod: (a, b) => {
                    if (timeConverter[a] === timeConverter[b]) {
                      return 0;
                    }
                    return timeConverter[a] > timeConverter[b] ? 1 : -1;
                  }
                },
                {
                  Header: "Locat.",
                  headerClassName: 'biggerHeader',
                  accessor: "location",
                  style: {'font-size': '30px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },             
                {
                  Header: "Wind mph",
                  headerClassName: 'biggerHeader',
                  accessor: 'windSpeed',
                  style: {'font-size': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString())
                },
                {
                  Header: "Wind Dir.",
                  headerClassName: 'biggerHeader',
                  accessor: 'windDirection',
                  style: {'font-size': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "Condit.",
                  headerClassName: 'biggerHeader',
                  accessor: 'conditions',
                  style: {'font-size': '20px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "User",
                  headerClassName: 'biggerHeader',
                  accessor: 'user_Name',
                  style: {'font-size': '30px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "Log ID",
                  headerClassName: 'biggerHeader',
                  accessor: 'id',
                  style: {'font-size': '30px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "User ID",
                  headerClassName: 'biggerHeader',
                  accessor: 'user_id',
                  style: {'font-size': '30px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toLowerCase())
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







