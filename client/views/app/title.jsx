// Dependencies
import React from 'react'

import FoundSubscriber from '../abstract/found-subscriber'

import {name as productionName} from '../../../package'

// Public
class Title extends FoundSubscriber{
  render(){
    let title= `${this.state.tag}(${this.state.page}) - ${productionName}`

    if(process.env.IS_CLIENT){
      document.title= title
    }
    else{
      return(
        <title>{title}</title>
      )
    }
  }
}

export default Title
