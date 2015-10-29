// Dependencies
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {match,RoutingContext} from 'react-router'
import beautify from 'victorica'

import routes from './src'
import finder from './src/actions/finder'
import App from './src/views/app'

import express from 'express'
import browserify from 'browserify-middleware'

// Environment
process.env.IS_SERVER= true
if(process.env.PORT==null){
  process.env.PORT= 59798
}

let IS_PRODUCTION= process.env.NODE_ENV==='production'

// setup server-side-renderer(middleware)
let router= routes =>{
  return (req,res,next)=>{
    let clawler= /msie\s[6-9]|bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google/
    let isClient= req.get('User-Agent').toLowerCase().match(clawler) === null
    if(isClient){
      return next()
    }

    let location= req.url
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

      let route= ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
      let html= '<!doctype html>\n'+route
      if(IS_PRODUCTION){
        res.send(html)
      }
      else{
        res.send(beautify(html))
      }
    })
  }
}

// setup browserify middleware
browserify.settings('basedir',__dirname)
browserify.settings('transform',['babelify'])
browserify.settings('extensions',['.js','.json','.jsx'])

// setup history api routes
let app= express()
app.get('/favicon.ico',(req,res)=>{
  res.redirect('https://raw.githubusercontent.com/59naga/fixture-images/master/still.GIF')
})
app.get('/index.js',browserify('client.jsx'))
app.use(finder.middleware())
app.use(router(routes))
app.use((req,res)=>{
  let route= ReactDOMServer.renderToStaticMarkup(<App/>)
  let html= '<!doctype html>\n'+route
  if(IS_PRODUCTION){
    res.send(html)
  }
  else{
    res.send(beautify(html))
  }
})

// Boot
app.listen(process.env.PORT,()=>{
  console.log('Server running at http://localhost:%s',process.env.PORT)
})
