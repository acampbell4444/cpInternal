import WLogIndex from '../components/WLogIndex'
import { connect } from 'react-redux'
import { deleteLogEntry, fetchWeatherLogs } from '../reducers/weatherLog'


const mapstateToProps = state => {
	const user = state.auth.user ? state.auth.user : null
	const allLogs = state.weatherLog.allWeatherLogs
  return {
  	user,
  	allLogs
  }
}

const mapDisptachToProps = (dispatch, ownProps) => (
  {
  	removeLogEntry(id){
  		dispatch(deleteLogEntry(id))
  	},
  	getAllLogs(){
  		dispatch(fetchWeatherLogs())
  	}
  }
)

export default connect(mapstateToProps, mapDisptachToProps)(WLogIndex)
