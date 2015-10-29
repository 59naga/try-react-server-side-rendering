// Dependencies
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import {match,RoutingContext} from 'react-router'
import App from '../client/views/app'
import beautify from 'victorica'

const clawlerRegexp= /msie\s[6-9]|bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google/

// Public
const router= routes=>{
  return (req,res,next)=>{
    let location= req.url
    let isClient= req.get('User-Agent').toLowerCase().match(clawlerRegexp) === null
    match({location,routes},(error,redirectLocation,renderProps)=>{
      if(redirectLocation){
        return res.redirect(redirectLocation)
      }
      if(error){
        return res.status(500).send(error.message)
      }
      if(renderProps==null){
        return next()
      }

      let route
      if(isClient){
        route= ReactDOMServer.renderToStaticMarkup(<App/>)
      }
      else{
        route= ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
      }

      let html= '<!doctype html>\n'+route
      if(process.env.NODE_ENV==='production'){
        res.send(html)
      }
      else{
        res.send(beautify(html))
      }
    })
  }
}

export default router
