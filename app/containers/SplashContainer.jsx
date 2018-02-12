import Splash from '../components/Splash'
import {connect} from 'react-redux'
import { whoami } from '../reducers/auth'

const mapStateToProps = (state, ownProps) => {
  
  console.log('ownprops', ownProps)
  let user = ownProps.user ? ownProps.user.user ? ownProps.user.user : undefined : undefined
  
  return {
  	user
  }
}

const mapDispatchToProps = dispatch => ({
  getUserStatus() {
    return dispatch(whoami())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)