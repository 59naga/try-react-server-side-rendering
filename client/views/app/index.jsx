// Dependencies
import React from 'react'

import Title from './title'

// Public
class App extends React.Component{
  render(){
    let container= (
      <div id="container">
        {this.props.children}
      </div>
    )

    if(process.env.IS_CLIENT){
      return container
    }
    else{
      return(
        <html>
          <head>
            <meta charSet="UTF-8" />
            <Title />
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700' rel='stylesheet' />
            <script src="/bundle.js"></script>
          </head>
          <body>
            <main>{container}</main>
          </body>
        </html>
      )
    }
  }
}

export default App
