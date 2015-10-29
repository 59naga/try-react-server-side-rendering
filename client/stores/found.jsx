// Dependencies
import EventEmitter from 'carrack'

import finder from '../actions/finder'

// Publish as singleton
class Found extends EventEmitter{
  constructor(){
    super()

    this.data= {}
    finder.on('update',this.onUpdate)
  }

  onUpdate= (data)=>{
    this.data= data

    return this.emit('change')
  }

  get= ()=>{
    return this.data
  }
}

export default new Found
