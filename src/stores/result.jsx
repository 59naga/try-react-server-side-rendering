// Dependencies
import EventEmitter from 'carrack'

// Public
class Result extends EventEmitter{
  constructor(...props){
    super(...props)

    this.data= {}
    this.on('update',this.update)
  }

  update= (data)=>{
    this.data= data

    return this.emit('change')
  }

  get= ()=>{
    return this.data
  }
}

export default new Result
