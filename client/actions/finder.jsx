// Dependencies
import EventEmitter from 'carrack'

import express from 'express'
import bandcamp from 'band-camp'
import axios from 'axios'

// Publish as singleton
class Finder extends EventEmitter{
  summaries= ({routes,params,location},replaceState,callback)=>{
    let tag= params.tag || 'Vocaloid'
    let page= ~~(location.query.page || 1)
    let first= page
    let last= page
    let options= {first,last}

    let promise
    if(process.env.IS_SERVER){
      promise= bandcamp(tag,options)
    }
    if(process.env.IS_CLIENT){
      promise= axios('/api/summaries/'+encodeURIComponent(tag),{params:options})
      // via middleware ...
      .then(response=>{
        return response.data
      })
    }

    return promise.then((summaries)=>{
      return this.emit('update',{tag,page,summaries})
    })
    .then(()=>{
      callback()
    })
    .catch(reason=>{
      console.error(reason)
      if(process.exit){
        process.exit(1)
      }
    })
  }

  // server handlers
  middleware= ()=>{
    let router= express.Router()

    // Add express routes
    router.get('/api/',(req,res)=>{
      res.json('powerd by https://github.com/59naga/band-camp')
    })
    router.get('/api/summaries/:tag',(req,res)=>{
      bandcamp(req.params.tag,req.query)
      .then(summaries=>{
        res.json(summaries)
      })
      .catch((error)=>{
        res.status(500).send(error.message)
      })
    });

    return router
  }
}

export default new Finder
