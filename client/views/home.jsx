// Dependencies
import React from 'react'

import FoundSubscriber from './abstract/found-subscriber'
import {VelocityTransitionGroup} from 'velocity-react'

import {Link} from 'react-router'

// Public
class Home extends FoundSubscriber{
  render(){
    let summaries= this.state.summaries.map((summary,i)=>{
      return (
        <li key={summary.url}>
          {summary.title}
        </li>
      )
    })
    if(summaries.length===0){
      summaries= <li>検索結果は・・・ゼロだ！</li>
    }

    let links= []
    if(this.state.page>1){
      let query= {page:this.state.page-1}

      links.push(
        <Link key={query.page} to={'/'+this.state.tag} query={query}>
          まえ
        </Link>
      )
    }
    if(summaries.length===40){
      let query= {page:this.state.page+1}

      links.push(
        <Link key={query.page} to={'/'+this.state.tag} query={query}>
          つぎ
        </Link>
      )
    }

    return(
      <article>
        <header>
          <h2>{this.state.tag.toUpperCase()}</h2>
          <nav>{links}</nav>
        </header>
        <ul>
          <VelocityTransitionGroup
            runOnMount={true}
            enter={
              {
                animation: 'fadeIn',
                stagger: 100,
              }
            }
            leave={
              {
                animation: 'fadeOut',
                stagger: 100,
              }
            }
          >
            {summaries}
          </VelocityTransitionGroup>
        </ul>
      </article>
    )
  }
}

export default Home
