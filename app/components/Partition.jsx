import React, { Component } from 'react'

export default class Partition extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('partition did mount')
  }

  render() {
    return (
      <div>'Put partition here'</div>
    )
  }
}

function funky() {
  return 'yo'
}
