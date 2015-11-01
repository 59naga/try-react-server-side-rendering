// Dependencies
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import webpackDevMiddleware from 'webpack-dev-middleware'

import finder from './client/actions/finder'
import router from './server/router'
import routes from './client/routes'

// Environment
process.env.IS_SERVER= true
if(process.env.PORT==null){
  process.env.PORT= 59798
}

// setup client environment
const app= express()
app.get('/favicon.ico',(req,res)=>{
  res.redirect('https://raw.githubusercontent.com/59naga/fixture-images/master/still.GIF')
})
app.use((req,res,next)=>{
  if(process.env.NODE_ENV==='production'){
    next()// expect a `bundle.js` of static file.
  }
  else{
    webpackDevMiddleware(webpack(webpackConfig))(req,res,next)
  }
})
app.use(express.static('.'))
app.use(finder.middleware())
app.use(router(routes))

// Boot if directly executed
if(require.main===module){
  app.listen(process.env.PORT,()=>{
    console.log('Server running at http://localhost:%s',process.env.PORT)
  })
}

// Public
export default app
