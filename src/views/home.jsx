// Dependencies
import React from 'react'
import {Link} from 'react-router'

import result from '../stores/result'

// Public
class Home extends React.Component{
  // client lifecycles
  componentDidMount(){
    result.on('change',this.handleChange)
  }
  componentWillUnmount(){
    result.off('change',this.handleChange)
  }
  handleChange= (data)=>{
    this.setState(result.get())
  }

  // isomorphic
  constructor(...props){
    super(...props)

    this.state= result.get()
  }
  render(){
    let summaries= this.state.summaries.map((summary,i)=>{
      return (
        <li key={summary.url}>
          {summary.title}
        </li>
      )
    })
    if(summaries.length===0){
      summaries= <p>検索結果は・・・ゼロだ！</p>
    }

    let links= []
    let query
    if(this.state.page>1){
      query= {page:this.state.page-1}

      links.push(
        <Link key={query.page} to={'/'+this.state.tag} query={query}>
          まえ
        </Link>
      )
    }
    if(summaries.length===40){
      query= {page:this.state.page+1}

      links.push(
        <Link key={query.page} to={'/'+this.state.tag} query={query}>
          つぎ
        </Link>
      )
    }

    return(
      <article>
        <header>
          <h2>ほーむ</h2>
          <nav>{links}</nav>
        </header>
        {summaries}
      </article>
    )
  }
}

export default Home
