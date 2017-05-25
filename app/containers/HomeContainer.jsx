import Home from '../components/Home'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  const user = state.auth
  return {
    user
  }
}

export default connect(mapStateToProps)(Home)
