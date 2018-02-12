import WLogIndex from '../components/WLogIndex'
import { connect } from 'react-redux'

const mapstateToProps = state => {
	const user = state.auth.user ? state.auth.user : null
	const allLogs = state.weatherLog.allWeatherLogs
  return {
  	user,
  	allLogs
  }
}

const mapDisptachToProps = (dispatch, ownProps) => (
  {}
)

export default connect(mapstateToProps, mapDisptachToProps)(WLogIndex)
