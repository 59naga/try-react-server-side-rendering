// Dependencies
import React from 'react'

import found from '../../stores/found'

// Public
class FoundSubscriber extends React.Component{
  constructor(...props){
    super(...props)

    this.state= found.get()
  }

  componentDidMount= ()=>{
    found.on('change',this.onChange)
  }
  onChange= ()=>{
    this.setState(found.get())
  }
  componentWillUnmount= ()=>{
    found.off('change',this.onChange)
  }
}

export default FoundSubscriber
