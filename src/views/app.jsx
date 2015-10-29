// Dependencies
import React from 'react'

// Public
class App extends React.Component{
  // isomorphic
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
            <title>hello world</title>
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700' rel='stylesheet' />
            <script src="index.js"></script>
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
