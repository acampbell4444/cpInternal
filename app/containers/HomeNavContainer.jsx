import HomeNavigationalComponent from '../components/HomeNavigationalComponent'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  let user = ownProps.user.user
  const currentComponent = state.auth.currentComponent
  return {
    user,
    currentComponent
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigationalComponent)